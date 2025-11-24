
import { Users, Ship, Target, Linkedin } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'About Selective Crew | Our Mission in Maritime Recruitment',
  description: 'Learn about Selective Crew, our mission to connect maritime professionals with the best onboard job opportunities, and our vision for the future of the maritime industry.',
};


export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            About Selective Crew
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We are dedicated to connecting skilled maritime professionals with the industry's best job opportunities. Our mission is to
            create a seamless, efficient, and trustworthy platform for maritime and cruise ship recruitment.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-7">Our Mission</h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              To empower maritime careers by leveraging technology and deep industry expertise, ensuring the
              right talent finds the right onboard opportunity.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Ship className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-7">Our Vision</h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              To be the world&apos;s most trusted and effective digital hub for the
              global maritime community, fostering connections that drive the
              industry forward.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-semibold leading-7">Our Team</h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              Our team consists of maritime veterans, technology experts, and
              recruitment specialists passionate about revolutionizing the way
              the maritime industry connects and grows.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
            <Button asChild>
                <a href="https://www.linkedin.com/in/selectivecrew/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    Connect with us on LinkedIn
                </a>
            </Button>
        </div>
      </div>
    </div>
  );
}
