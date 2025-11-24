
'use server';

import { z } from 'zod';
import { jobs } from '@/lib/jobs';
import { sendEmail } from '@/lib/email';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const schema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  nationality: z.string().min(2, { message: 'Nationality must be at least 2 characters.' }),
  jobId: z.string(),
  stcw: z.enum(['yes', 'no', 'not-sure'], { required_error: 'Please select an option for STCW certification.' }),
  availability: z.enum(['yes', 'no'], { required_error: 'Please select an option for availability.' }),
  experience: z.enum(['yes', 'no'], { required_error: 'Please select an option for cruise ship experience.' }),
  resume: z
    .any()
    .refine((file) => file && file.size > 0, 'Resume is required.')
    .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        `Resume file size must be less than 5MB.`
    )
    .refine(
        (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
        'Invalid file type. Only .pdf, .doc, and .docx are accepted.'
    ),
});

export type FormState = {
  message: string;
  isSuccess: boolean;
  issues?: string[];
};

export async function applyForJob(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = {
    fullName: data.get('fullName'),
    email: data.get('email'),
    nationality: data.get('nationality'),
    jobId: data.get('jobId'),
    stcw: data.get('stcw'),
    availability: data.get('availability'),
    experience: data.get('experience'),
    resume: data.get('resume'),
  };

  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data. Please check your inputs.',
      isSuccess: false,
      issues,
    };
  }
  
  const { fullName, email, nationality, resume, jobId, stcw, availability, experience } = parsed.data;

  const job = jobs.find(j => j.id === jobId);

  if (!job || !job.email) {
    return {
      message: 'The job you are applying for could not be found or has no email address configured.',
      isSuccess: false
    };
  }

  // --- Email Sending Logic ---
  try {
    const recipient = job.email;
    const subject = `Application for ${job.title} from ${fullName}`;
    const htmlContent = `
      <h1>New Job Application</h1>
      <p>A new application has been submitted for the position of <strong>${job.title}</strong>.</p>
      <h2>Applicant Details:</h2>
      <ul>
        <li><strong>Full Name:</strong> ${fullName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Nationality:</strong> ${nationality}</li>
      </ul>
      <h2>Pre-Screening Answers:</h2>
      <ul>
        <li><strong>Has STCW Certification:</strong> ${stcw}</li>
        <li><strong>Available for 6-8 month contracts:</strong> ${availability}</li>
        <li><strong>Previous Cruise Ship Experience:</strong> ${experience}</li>
      </ul>
      <p>The applicant's resume is attached to this email.</p>
    `;

    // Convert the resume file to a Base64 string for the attachment
    const resumeBuffer = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString('base64');
    
    await sendEmail({
      to: recipient,
      subject,
      htmlContent,
      replyTo: email,
      attachment: {
        name: resume.name,
        content: resumeBase64,
      },
    });
    
    return {
      message: `Your application for ${job.title} has been submitted successfully to ${recipient}!`,
      isSuccess: true,
    };

  } catch (e) {
    console.error('Failed to process application:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    
    let userFriendlyMessage = `An unexpected error occurred on the server. Please try again later.`;

    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
        userFriendlyMessage = 'Email API authentication failed. Please check if the BREVO_API_KEY is correct.';
    } else if (errorMessage.includes('not configured')) {
        userFriendlyMessage = 'The email service is not configured. The API key might be missing.';
    }

    return {
      message: userFriendlyMessage,
      isSuccess: false,
    };
  }
}
