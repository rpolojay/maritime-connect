
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, MessageCircle, Laptop, Video, Zap, CheckCircle, Lightbulb, UserCheck, Quote } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get Hired: Cruise Ship Interview Essentials',
  description: 'Learn the key essentials for acing your cruise ship job interview with our expert guide, from technical setup to what recruiters look for.',
};

export default function GetHiredPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Get Hired: Cruise Ship Interview Essentials
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Watch this video to learn the key tips for your next cruise ship job interview, then use our checklists below to make sure you're ready to impress.
        </p>
      </div>

      <div className="aspect-w-16 aspect-h-9 relative w-full overflow-hidden rounded-lg shadow-lg mb-16" style={{paddingTop: '56.25%'}}>
        <iframe
          className="absolute top-0 left-0 h-full w-full"
          src="https://www.youtube.com/embed/wdwPuFeeWEw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Why Online Interviews Matter Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Your Online Interview Matters</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Showcasing Professionalism</h3>
                <p className="text-muted-foreground">Your online presence is the first impression a recruiter gets. A professional setup shows you're serious and well-prepared for a demanding role at sea.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demonstrating Teamwork</h3>
                <p className="text-muted-foreground">Cruise ship life is about collaboration. A smooth, interruption-free interview proves you can manage your environment and respect others' time—key skills for living and working in a close-knit crew.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Effective Communication</h3>
                <p className="text-muted-foreground">Clear audio and video are essential for clear communication. By ensuring your tech works perfectly, you show that you can communicate effectively, a vital skill when working with an international crew and guests.</p>
            </div>
        </div>
      </section>

      {/* Interview Preparation Checklist Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Interview Preparation Checklist</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Laptop className="h-6 w-6 text-primary"/>Technical Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>✓ Test your internet connection.</p>
              <p>✓ Check your webcam and microphone.</p>
              <p>✓ Close unnecessary tabs and apps.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Video className="h-6 w-6 text-primary"/>Environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>✓ Choose a quiet, well-lit space.</p>
              <p>✓ Ensure a neutral, professional background.</p>
              <p>✓ Inform others not to disturb you.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="h-6 w-6 text-primary"/>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>✓ Dress professionally.</p>
              <p>✓ Maintain good posture.</p>
              <p>✓ Smile and make eye contact.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* What Recruiters Look For Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Recruiters Look For</h2>
        <Card>
            <CardContent className="pt-6">
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Team-Oriented Attitude</h4>
                            <p className="text-muted-foreground">They want to see if you can live and work harmoniously with a diverse, international crew.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Strong Communication Skills</h4>
                            <p className="text-muted-foreground">Clear, polite, and confident communication is essential for both guest service and crew safety.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Resilience Under Pressure</h4>
                            <p className="text-muted-foreground">Life at sea can be demanding. Recruiters look for candidates who remain calm and positive in challenging situations.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Passion for Hospitality</h4>
                            <p className="text-muted-foreground">A genuine desire to create excellent experiences for guests is non-negotiable in the cruise industry.</p>
                        </div>
                    </li>
                </ul>
            </CardContent>
        </Card>
      </section>

      {/* How to Introduce Yourself Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How to Introduce Yourself</h2>
        <div className="bg-muted p-8 rounded-lg relative">
            <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
            <p className="text-lg italic text-center">
                &quot;Hello, my name is [Your Name]. I&apos;m a dedicated [Your Profession] with [Number] years of experience in [Your Industry]. I was drawn to this opportunity with [Cruise Line Name] because of your reputation for excellent guest service, and I&apos;m confident that my skills in [Your Key Skill] would make me a valuable member of your team.&quot;
            </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Interview?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">If you need more personalized advice or want to practice with a professional, our team is here to help you prepare.</p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Get Personalized Interview Prep</Link>
        </Button>
      </section>
    </div>
  );
}
