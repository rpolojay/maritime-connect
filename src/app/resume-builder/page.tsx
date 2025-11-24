
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import {
  User,
  Phone,
  Mail,
  Globe,
  Award,
  Mic,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  Printer,
  Trash2,
  PlusCircle,
  Paperclip,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// --- TYPE DEFINITIONS ---

interface PersonalDetails {
  name: string;
  title: string;
  nationality: string;
  phone: string;
  email: string;
  photo?: string;
}

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  date: string;
}

interface Skill {
  id: string;
  name: string;
}

// --- HELPER COMPONENTS ---

const EditableField = ({ value, onChange, placeholder, as: Component = 'div', className }: { value: string; onChange: (newValue: string) => void; placeholder?: string; as?: 'div' | 'textarea'; className?: string; }) => {
  const handleInput = (e: ChangeEvent<HTMLDivElement | HTMLTextAreaElement>) => {
    onChange(e.currentTarget.textContent || '');
  };

  if (Component === 'textarea') {
      return (
          <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={cn("w-full resize-none border-dashed border-gray-300 focus:border-solid p-2 text-sm", className)}
              rows={4}
          />
      );
  }

  return (
      <div
          contentEditable
          suppressContentEditableWarning
          onBlur={handleInput}
          className={cn("w-full border-dashed border-gray-300 focus:border-solid p-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:bg-background rounded-md", className)}
          dangerouslySetInnerHTML={{ __html: value }}
      />
  );
};

const ResumeSection = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode; }) => (
  <div className="mb-6">
    <h3 className="flex items-center gap-2 font-bold text-lg mb-3 text-primary border-b-2 border-accent pb-2">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

// --- MAIN RESUME BUILDER PAGE ---

export default function ResumeBuilderPage() {
  const [personal, setPersonal] = useState<PersonalDetails>({
    name: 'Your Name',
    title: 'Experienced Maritime Hospitality Professional',
    nationality: 'Nationality',
    phone: '+1 (555) 123-4567',
    email: 'your.email@example.com',
  });
  const [summary, setSummary] = useState('Dedicated maritime hospitality professional with extensive experience in cruise ship operations. Proven track record of enhancing guest experiences while maintaining the highest standards of safety and service.');
  const [work, setWork] = useState<WorkExperience[]>([
    { id: 'work1', title: 'Guest Services Coordinator', company: 'Royal Caribbean', date: '2022-2023', description: 'Provided exceptional customer service to 5,000+ guests daily.' },
    { id: 'work2', title: 'Duty-Free Sales Associate', company: 'Norwegian Cruise Line', date: '2021-2022', description: 'Achieved top sales performance in luxury goods and duty-free merchandise.' },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: 'edu1', degree: 'STCW Basic Safety Training', school: 'Maritime Training Institute', date: '2023' },
    { id: 'edu2', degree: 'Bachelor of Hospitality Management', school: 'University of Tourism', date: '2020' },
  ]);
  const [skills, setSkills] = useState<Skill[]>([
    { id: 'skill1', name: 'Customer Service' },
    { id: 'skill2', name: 'Hospitality' },
  ]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePersonalChange = (field: keyof PersonalDetails, value: string) => {
    setPersonal(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader();
      reader.onload = (event) => {
        handlePersonalChange('photo', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert('Photo must be smaller than 5MB');
    }
  };

  const handleAddItem = <T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>, newItem: T) => {
    setter(prev => [...prev, newItem]);
  };
  
  const handleRemoveItem = <T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>, id: string) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateItem = <T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>, id: string, field: keyof T, value: string) => {
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  return (
    <div className="bg-muted min-h-screen p-4 sm:p-8">
       <div className="fixed top-4 right-4 z-50">
           <Button onClick={() => window.print()} className="print-btn">
               <Printer className="mr-2" />
               Print or Save as PDF
           </Button>
       </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 print:grid-cols-3">
        {/* --- LEFT COLUMN (SIDEBAR) --- */}
        <div className="lg:col-span-1 bg-card rounded-lg p-6 print:p-4 print:bg-gray-100">
          <div className="text-center mb-6">
            <div
              className="mx-auto w-32 h-32 rounded-full bg-secondary flex items-center justify-center cursor-pointer mb-4 overflow-hidden"
              onClick={() => photoInputRef.current?.click()}
            >
              {personal.photo ? (
                <img src={personal.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
             <EditableField 
                value={personal.name} 
                onChange={(val) => handlePersonalChange('name', val)} 
                className="text-2xl font-bold text-center !border-none"
             />
          </div>

          <ResumeSection icon={<Paperclip />} title="Contact Information">
              <div className="space-y-3">
                  <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary flex-shrink-0"/>
                      <EditableField value={personal.nationality} onChange={(val) => handlePersonalChange('nationality', val)} placeholder="Your Nationality" />
                  </div>
                   <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0"/>
                      <EditableField value={personal.phone} onChange={(val) => handlePersonalChange('phone', val)} placeholder="Your Phone" />
                  </div>
                   <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary flex-shrink-0"/>
                      <EditableField value={personal.email} onChange={(val) => handlePersonalChange('email', val)} placeholder="Your Email" />
                  </div>
              </div>
          </ResumeSection>

          <ResumeSection icon={<Sparkles />} title="Skills">
            <div className="space-y-2">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center gap-2">
                  <EditableField value={skill.name} onChange={(val) => handleUpdateItem(setSkills, skill.id, 'name', val)} placeholder="New Skill" />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(setSkills, skill.id)} className="print:hidden">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => handleAddItem(setSkills, {id: `skill${Date.now()}`, name: 'New Skill'})} className="mt-4 print:hidden">
                <PlusCircle className="mr-2" /> Add Skill
            </Button>
          </ResumeSection>
        </div>

        {/* --- RIGHT COLUMN (MAIN CONTENT) --- */}
        <div className="lg:col-span-2 bg-card rounded-lg p-6 print:p-4">
            <div className="text-center mb-8 pb-4 border-b-2 border-accent">
                <EditableField 
                    value={personal.title} 
                    onChange={(val) => handlePersonalChange('title', val)} 
                    className="text-2xl font-semibold text-center !border-none text-primary"
                />
            </div>
            
            <Card className="mb-6 bg-blue-50 border-blue-200 print:hidden">
                <CardHeader className="flex flex-row items-center gap-2 !pb-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">How to Use This Builder</h4>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                        <li>Click on any text with a dashed border to edit it.</li>
                        <li>Use the "Add" buttons to create new entries for work, education, and skills.</li>
                        <li>Click the profile icon to upload a professional photo (under 5MB).</li>
                        <li>When finished, click "Print or Save as PDF" to get your final resume.</li>
                    </ul>
                </CardContent>
            </Card>

           <ResumeSection icon={<User />} title="Professional Summary">
             <EditableField as="textarea" value={summary} onChange={setSummary} placeholder="A brief professional summary..." />
          </ResumeSection>
          
           <ResumeSection icon={<Briefcase />} title="Work Experience">
                <div className="space-y-4">
                    {work.map(job => (
                        <Card key={job.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-grow">
                                    <EditableField value={job.title} onChange={(val) => handleUpdateItem(setWork, job.id, 'title', val)} placeholder="Job Title" className="font-bold !text-base" />
                                    <EditableField value={job.company} onChange={(val) => handleUpdateItem(setWork, job.id, 'company', val)} placeholder="Company Name" className="text-muted-foreground" />
                                </div>
                                <EditableField value={job.date} onChange={(val) => handleUpdateItem(setWork, job.id, 'date', val)} placeholder="Dates" className="text-sm text-muted-foreground text-right" />
                            </div>
                            <EditableField as="textarea" value={job.description} onChange={(val) => handleUpdateItem(setWork, job.id, 'description', val)} placeholder="Describe your role and achievements." />
                             <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(setWork, job.id)} className="mt-2 print:hidden">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </Card>
                    ))}
                </div>
                 <Button variant="outline" onClick={() => handleAddItem(setWork, {id: `work${Date.now()}`, title: 'New Position', company: 'Company Name', date: 'Year - Year', description: 'Your responsibilities...'})} className="mt-4 print:hidden">
                    <PlusCircle className="mr-2" /> Add Work Experience
                </Button>
           </ResumeSection>

            <ResumeSection icon={<GraduationCap />} title="Education & Certifications">
                <div className="space-y-4">
                    {education.map(edu => (
                         <Card key={edu.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-grow">
                                    <EditableField value={edu.degree} onChange={(val) => handleUpdateItem(setEducation, edu.id, 'degree', val)} placeholder="Degree or Certification" className="font-bold !text-base" />
                                    <EditableField value={edu.school} onChange={(val) => handleUpdateItem(setEducation, edu.id, 'school', val)} placeholder="Institution Name" className="text-muted-foreground" />
                                </div>
                                <EditableField value={edu.date} onChange={(val) => handleUpdateItem(setEducation, edu.id, 'date', val)} placeholder="Year" className="text-sm text-muted-foreground text-right" />
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(setEducation, edu.id)} className="mt-2 print:hidden">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </Card>
                    ))}
                </div>
                 <Button variant="outline" onClick={() => handleAddItem(setEducation, {id: `edu${Date.now()}`, degree: 'New Certification', school: 'Institution Name', date: 'Year'})} className="mt-4 print:hidden">
                    <PlusCircle className="mr-2" /> Add Education
                </Button>
            </ResumeSection>
        </div>
      </div>
      <style jsx global>{`
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .print-btn, .print\\:hidden {
                display: none;
            }
            .container {
                 box-shadow: none;
                 border: none;
            }
        }
      `}</style>
    </div>
  );
}
