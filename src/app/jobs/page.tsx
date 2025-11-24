

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ship, Search, Info, FileText } from "lucide-react";
import { jobs } from "@/lib/jobs";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="container mx-auto py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Find Your Next Maritime Job</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Search thousands of cruise ship, yacht, and shipping job opportunities in the maritime industry.</p>
        </div>

        <Alert className="mb-8 bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-600">
            <Info className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
                All positions with Grand Circle Cruise Line are currently on hold. Please check back next season for openings.
            </AlertDescription>
        </Alert>

        <Card className="mb-8">
            <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-end">
                    <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Job title, keywords, e.g., '2nd Officer'" className="pl-10" />
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Vessel Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="container">Container Ship</SelectItem>
                            <SelectItem value="cruise">Cruise Ship</SelectItem>
                            <SelectItem value="tanker">Tanker</SelectItem>
                            <SelectItem value="bulker">Bulker</SelectItem>
                            <SelectItem value="yacht">Yacht</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="w-full">Search Jobs</Button>
                </div>
            </CardContent>
        </Card>
        
        <Card className="mb-8 text-center bg-secondary">
            <CardHeader>
                <CardTitle>Need a Professional Resume?</CardTitle>
                <CardDescription>Build a cruise-specific resume in minutes with our AI-powered tool.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/resume-builder">Try the Resume Builder</Link>
                </Button>
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <Card key={job.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="pt-1">{job.company}</CardDescription>
                            </div>
                             {job.status === 'On Hold' && (
                                <Badge variant="secondary">On Hold</Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Ship className="h-4 w-4" />
                            <span>{job.type}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full" disabled={job.status === 'On Hold'}>
                            <Link href={`/jobs/${job.id}`}>View Details</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
