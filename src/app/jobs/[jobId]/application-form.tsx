
'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { applyForJob } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FormState = {
  message: string;
  isSuccess: boolean;
  issues?: string[];
};

const initialState: FormState = {
  message: '',
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      Submit Application
    </Button>
  );
}

export function ApplicationForm({ jobId, jobTitle }: { jobId: string, jobTitle: string }) {
  const [state, formAction] = useFormState(applyForJob, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast({
          title: 'Success!',
          description: state.message,
        });
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
        if(state.issues) {
            state.issues.forEach((issue) => {
                toast({
                    title: 'Validation Error',
                    description: issue,
                    variant: 'destructive',
                });
            });
        }
      }
    }
  }, [state, toast]);

  if (state.isSuccess) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Submitted</CardTitle>
            </CardHeader>
            <CardContent>
                <Alert variant="default" className="border-green-500 text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-600">Thank You!</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
  }


  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Apply for this Role</CardTitle>
          <CardDescription>Fill out the form below and upload your resume to apply for {jobTitle}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <input type="hidden" name="jobId" value={jobId} />
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input id="nationality" name="nationality" placeholder="e.g. American" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Resume/CV</Label>
            <Input id="resume" name="resume" type="file" required accept=".pdf,.doc,.docx" />
             <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX. Max size: 5MB.</p>
          </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pre-Screening Questions</h3>
                 <div className="space-y-2">
                    <Label>Do you have a valid STCW certification?</Label>
                     <RadioGroup name="stcw" required>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="stcw-yes" />
                            <Label htmlFor="stcw-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="stcw-no" />
                            <Label htmlFor="stcw-no">No</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not-sure" id="stcw-not-sure" />
                            <Label htmlFor="stcw-not-sure">I'm not sure</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label>Are you available for contracts lasting 6-8 months?</Label>
                     <RadioGroup name="availability" required>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="availability-yes" />
                            <Label htmlFor="availability-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="availability-no" />
                            <Label htmlFor="availability-no">No</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="space-y-2">
                    <Label>Have you worked on a cruise ship before?</Label>
                     <RadioGroup name="experience" required>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="experience-yes" />
                            <Label htmlFor="experience-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="experience-no" />
                            <Label htmlFor="experience-no">No</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
