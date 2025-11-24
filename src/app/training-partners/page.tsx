
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Partners | Selective Crew',
  description: 'Bridge the gap between ambition and experience with our official training partner, ShipService.pro. Develop the skills you need for a successful maritime career.',
};

export default function TrainingPartnersPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Bridging the Gap Between Ambition and Experience
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          At Selective Crew, we maintain rigorous standards for the candidates we present to our cruise line partners. We look for specific experience, technical skills, and a deep understanding of the shipboard environment.
        </p>
        <p className="mt-2 text-lg leading-8 text-muted-foreground">
          We understand that many passionate candidates have the personality and the drive to succeed at sea but may lack the specific technical experience—particularly in Luxury Retail and Hospitality—required to pass the initial screening.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Our Official Training Partner: ShipService.pro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            To help potential crew members bridge this gap, we have partnered with ShipService.pro, a premier e-learning platform dedicated to the cruise industry.
          </p>
          <p className="mt-4 text-muted-foreground">
            While Selective Crew focuses on recruitment and placement, ShipService.pro focuses on skills development. Their courses are designed by industry veterans to teach the specific protocols, sales techniques, and lifestyle adjustments required for a successful contract.
          </p>
        </CardContent>
      </Card>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why We Recommend ShipService.pro</h2>
        <div className="grid md:grid-cols-1 gap-6">
            <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Industry-Aligned Curriculum</h3>
                    <p className="text-muted-foreground">Their material is updated regularly to reflect the current demands of major retail concessions and cruise lines.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Skill Verification</h3>
                    <p className="text-muted-foreground">When you complete a certification (such as the Retail Mastery Class), it demonstrates to our recruiters that you are serious about your career and have invested time in learning the job functions before boarding.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Priority Profile Update</h3>
                    <p className="text-muted-foreground">Candidates registered in the Selective Crew database who upload a ShipService.pro certificate receive a profile update, signaling to our recruitment team that they have acquired new, relevant skills.</p>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Recommended Courses for New Applicants</h2>
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Cruise Ship Retail Mastery Class</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Ideal for candidates with general retail experience who need to master luxury duty-free protocols.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Ship & Port Navigator</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Essential for understanding the unique logistics of life at sea.</p>
                </CardContent>
            </Card>
        </div>
      </div>

      <div className="text-center mb-12">
        <Button asChild size="lg">
            <a href="https://shipservice.pro" target="_blank" rel="noopener noreferrer">
                Explore Courses at ShipService.pro
            </a>
        </Button>
      </div>

      <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800 [&>svg]:text-yellow-600">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Disclaimer</AlertTitle>
        <AlertDescription>
          Note: Selective Crew is a recruitment agency and does not charge candidates for job placement. ShipService.pro is a separate educational entity. Purchasing a course is optional and does not guarantee employment or a specific job offer. However, we strongly value continuous learning and recognize the skills gained through these certifications during our screening process.
        </AlertDescription>
      </Alert>
    </div>
  );
}
