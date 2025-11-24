

'use client';

import { jobs } from "@/lib/jobs";
import { notFound } from "next/navigation";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship, Info, ShieldCheck } from "lucide-react";
import { ApplicationForm } from "./application-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function JobApplicationPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    notFound();
  }
  
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.title,
    'description': job.description,
    'hiringOrganization': {
      '@type': 'Organization',
      'name': job.company,
    },
    'jobLocation': {
        '@type': 'Place',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Onboard Ship',
        }
    },
    'employmentType': 'CONTRACTOR',
  };

  return (
    <div className="container mx-auto max-w-4xl py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">{job.title}</CardTitle>
                            <CardDescription className="pt-1 text-base">{job.company}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                 <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Ship className="h-5 w-5" />
                        <span>{job.type}</span>
                    </div>
                 </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {job.description || "Detailed job description is not available for this position. Please contact the employer for more information."}
                    </p>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
             <Alert className="bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-600">
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle className="font-bold">✅ 100% Free Recruitment Service</AlertTitle>
                <AlertDescription>
                   Selective Crew is a recruitment agency, not a placement seller. We do not charge candidates for job placement. Our services are paid for by the cruise lines we represent. Apply with confidence knowing your talent is our only currency.
                </AlertDescription>
            </Alert>
            {job.status === 'On Hold' ? (
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Applications On Hold</AlertTitle>
                    <AlertDescription>
                        This position is not currently accepting applications. Please check back next season.
                    </AlertDescription>
                </Alert>
            ) : (
                <ApplicationForm jobId={job.id} jobTitle={job.title} />
            )}
        </div>
      </div>
    </div>
  );
}
