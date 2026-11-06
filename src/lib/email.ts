import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_oxud7fh';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ivzh6re';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 't1UTKBJvAWvw1zyYD';

export interface SendEmailParams {
  name: string;
  email: string;
  message: string;
  toName?: string;
}

export async function sendContactEmail({
  name,
  email,
  message,
  toName = 'Janeesha',
}: SendEmailParams) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: name,
      from_email: email,
      message,
      to_name: toName,
    },
    PUBLIC_KEY
  );
}
