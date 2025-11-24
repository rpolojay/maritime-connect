
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'C1/D Visa Application Guide for Cruise Ship Crew',
  description: 'A step-by-step guide for maritime professionals on how to apply for the U.S. C1/D crew member visa to work on cruise ships.',
};

const steps = [
    { 
        title: "Step 1: Confirm You Need a C1/D Visa",
        content: "The C1/D visa is for crew members (seafarers) who will join vessels that enter, depart, or transit the United States. If your work includes staying on land for training or long meetings, also check whether a B1/B2 visa is needed."
    },
    {
        title: "Step 2: Complete the DS-160 Online Application",
        content: "Go to the U.S. Department of State's online form (CEAC). Select 'C1/D — Transit/crew member' as the visa type, fill it out completely, and print the confirmation page."
    },
    {
        title: "Step 3: Pay the Visa Fee",
        content: "Pay the non-refundable visa application fee. The amount and payment methods vary by country. Keep the receipt for your appointment."
    },
    {
        title: "Step 4: Schedule Your Appointments",
        content: "Most countries require two appointments: one for biometrics (at a VAC) and one for the consular interview. Schedule both through your local U.S. Embassy/Consulate website."
    },
    {
        title: "Step 5: Prepare Required Documents",
        content: "Bring originals and copies of your valid passport, DS-160 confirmation, fee receipt, appointment letter, letter of employment, and seaman's book."
    },
    {
        title: "Step 6: Attend the Visa Interview",
        content: "Arrive early and be prepared to answer questions about your job, employer, and travel schedule. Be honest and have all your documents ready."
    },
    {
        title: "Step 7: After Approval",
        content: "If approved, your passport will be returned with the visa sticker. Check the details carefully and follow the embassy's instructions for pickup or delivery."
    }
];

export default function C1DVisaPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                How to Apply for a C1/D Crew Member Visa
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
                A simple guide for seafarers who need a U.S. C1/D visa to work on cruise ships.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>7-Step Application Process</CardTitle>
                <CardDescription>Follow these steps carefully to ensure a smooth application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-muted-foreground">{step.content}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card className="mt-8 bg-secondary">
             <CardHeader>
                <CardTitle>Important Reminders</CardTitle>
             </CardHeader>
             <CardContent className="space-y-2 text-secondary-foreground">
                <p><strong>Do not book travel</strong> until your visa is approved and in your passport.</p>
                <p>Always check the specific requirements for your country on the local U.S. Embassy website.</p>
                <p>Be professional, punctual, and honest during your interview.</p>
             </CardContent>
        </Card>
    </div>
  );
}
