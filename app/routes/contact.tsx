import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import { Resend } from "resend";
import type { Route } from "./+types/contact";

const resend = new Resend("re_6qicDmFU_Amw2NvJfcWyWzyBjp1wRA6KA");

export function meta() {
  return [
    { title: "Contact - Ashiq C | Let's Work Together" },
    {
      name: "description",
      content:
        "Get in touch with Ashiq C for project inquiries, collaborations, or just to say hello. Available for freelance work and exciting opportunities.",
    },
    { name: "keywords", content: "contact, hire, freelance, collaboration" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "muhmdashiqc@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Contact />
    </>
  );
}
