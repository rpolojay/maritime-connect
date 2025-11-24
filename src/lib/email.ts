
'use server';

import * as Brevo from '@getbrevo/brevo';

interface SendEmailParams {
    to: string;
    subject: string;
    htmlContent: string;
    replyTo?: string;
    attachment?: {
        name: string;
        content: string; // Base64 encoded content
    };
}

const api = new Brevo.TransactionalEmailsApi();
api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function sendEmail({ to, subject, htmlContent, replyTo, attachment }: SendEmailParams) {
    if (!process.env.BREVO_API_KEY) {
        console.error('Brevo API key is not set. Cannot send email.');
        throw new Error('Email service is not configured.');
    }

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = { name: 'Selective Crew Jobs', email: 'jobs@selectivecrew.com' };
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    if (replyTo) {
        sendSmtpEmail.replyTo = { email: replyTo };
    }

    if (attachment) {
        sendSmtpEmail.attachment = [
            {
                name: attachment.name,
                content: attachment.content,
            },
        ];
    }

    try {
        const data = await api.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully. Response:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send email.');
    }
}
