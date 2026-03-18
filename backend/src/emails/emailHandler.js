import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js"

export async function sendWelcomeEmail (email,name,clientUrl) {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: 'Welcome to Izinyoka Tracker App!!',
    html: createWelcomeEmailTemplate(name,clientUrl),
  });

  if (error) {
    return console.error("Error sending an email", error);
  }

  console.log("Email sent successfully", data);
};