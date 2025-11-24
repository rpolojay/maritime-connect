
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ship, Users, FileText, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { jobs } from '@/lib/jobs';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Ruben De Jesus Hernandez',
    role: 'Guest Services, Carnival',
    quote: 'Thanks to Selective Crew I am now working on a cruise ship. The agency is very professional and the staff is very friendly and helpful.',
    imageId: 'testimonial-ruben',
  },
  {
    name: 'Shalom Coba',
    role: 'Photographer, Princess Cruises',
    quote: 'Selective Crew helped me get a job on a cruise ship and now I am traveling the world. I recommend them 100%.',
    imageId: 'testimonial-shalom',
  },
  {
    name: 'Evelin Hidalgo',
    role: 'Retail Supervisor, Starboard',
    quote: 'Selective Crew is the best agency to get a job on a cruise ship. They are very professional and they help you throughout the process.',
    imageId: 'testimonial-evelin',
  },
];

export function HomePage() {
  const heroImage = getPlaceholderImage('hero-background');
  
  // Get the first 6 active jobs to feature
  const featuredJobs = jobs.filter(job => job.status === 'Active').slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] text-primary-foreground">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold md:text-6xl">Your Next Cruise Ship Career Starts Here</h1>
          <p className="mt-4 max-w-2xl text-lg">Discover exciting job opportunities on the world's most luxurious cruise lines. Your adventure begins now.</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/jobs">Find Cruise Ship Jobs</Link>
          </Button>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary">A Smarter Way to Advance Your Maritime Career</h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">Selective Crew is your dedicated partner, offering powerful tools and exclusive job listings to help you succeed in the maritime industry.</p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase />
                  For Maritime Professionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Access exclusive job openings, get discovered by top maritime companies, and use our tools to build a professional profile that stands out.</p>
              </CardContent>
               <CardFooter>
                 <Button asChild variant="secondary">
                   <Link href="/jobs">Explore Job Openings</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText />
                  Professional Resume Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Create a standout resume tailored for the cruise and maritime industry. Our builder helps you highlight your skills and experience effectively.</p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="secondary">
                   <Link href="/resume-builder">Build your Resume</Link>
                 </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

       {/* Featured Jobs Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Featured Onboard Jobs</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Explore some of the latest cruise ship, yacht, and shipping opportunities from our trusted partners.</p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="text-left flex flex-col">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Ship className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/jobs/${job.id}`}>View Job</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/jobs">View All Maritime Jobs</Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Trusted by Maritime Professionals</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Hear what our users have to say about advancing their careers with Selective Crew.</p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => {
                const image = getPlaceholderImage(testimonial.imageId);
                return (
                    <Card key={testimonial.name} className="flex flex-col">
                        <CardContent className="pt-6 flex-grow">
                            <p className="italic text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                        </CardContent>
                        <CardFooter className="flex items-center gap-4">
                             {image && (
                                <Avatar>
                                    <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready to Take the Next Step in Your Maritime Career?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">Join Selective Crew today to access exclusive job listings and powerful career tools. Your next opportunity is just a click away.</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/jobs">Find a Job</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
