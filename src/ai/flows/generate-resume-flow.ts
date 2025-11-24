
'use server';
/**
 * @fileOverview A flow for generating a professional resume for maritime professionals.
 *
 * - generateResume - A function that takes user-provided details and returns a formatted resume.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GenerateResumeOutput - The return type for the generateResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalDetailsSchema = z.object({
  fullName: z.string().describe('The full name of the person.'),
  email: z.string().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  nationality: z.string().describe('The nationality.'),
});

const WorkExperienceSchema = z.object({
  title: z.string().describe('The job title or position.'),
  company: z.string().describe('The company or cruise line.'),
  startDate: z.string().describe('The start date of the employment.'),
  endDate: z.string().describe('The end date of the employment.'),
  description: z.string().describe('A description of responsibilities and achievements in the role.'),
});

const GenerateResumeInputSchema = z.object({
  personalDetails: PersonalDetailsSchema,
  professionalSummary: z.string().describe('A brief professional summary.'),
  workExperience: z.array(WorkExperienceSchema).describe('A list of work experiences.'),
  certificationsAndLicenses: z.string().describe('A list of certifications and licenses, separated by newlines.'),
});
export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

const GenerateResumeOutputSchema = z.object({
  resume: z.string().describe('The full, formatted resume text in Markdown format.'),
});
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: { schema: GenerateResumeInputSchema },
  output: { schema: GenerateResumeOutputSchema },
  prompt: `
    You are a professional resume writer specializing in the maritime and cruise ship industry.
    Your task is to generate a clean, professional, and well-formatted resume in Markdown based on the provided JSON data.

    Follow these instructions carefully:
    1.  **Header**: Start with the full name as the main heading (H1). Below the name, list the phone number, email address, and nationality on separate lines.
    2.  **Professional Summary**: Create a section titled "Professional Summary". Use the provided summary text. If it's well-written, use it as is. If it's weak, subtly improve it to sound more professional and impactful.
    3.  **Work Experience**: Create a section titled "Work Experience". For each job:
        - List the job title in bold, followed by the company/cruise line.
        - On the next line, list the employment dates (start date – end date).
        - Below the dates, use bullet points to list the responsibilities and achievements. Rephrase the provided descriptions into concise, action-oriented bullet points. Start each bullet with an action verb. Quantify achievements where possible (e.g., "Managed a team of 5", "Improved guest satisfaction scores by 10%").
    4.  **Certifications & Licenses**: Create a section titled "Certifications & Licenses". List each certification from the provided text on its own line as a bullet point.
    5.  **Formatting**: Use clear and consistent Markdown formatting. Use headings, bold text, and bullet points to create a readable structure. Do not include any introductory or concluding text like "Here is the resume:" or "Let me know if you need changes." Only output the resume content itself.

    Here is the data:
    Personal Details: {{personalDetails}}
    Professional Summary: {{{professionalSummary}}}
    Work Experience: {{workExperience}}
    Certifications & Licenses: {{{certificationsAndLicenses}}}
  `,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output?.resume) {
        throw new Error('The AI model failed to generate a resume. Please check your input and try again.');
    }
    return output;
  }
);
