import { env } from "@/env";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export const nubaApis = {
  sendEmail: (
    form: React.RefObject<HTMLFormElement | null>,
    setPending: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setPending(true);
    if (form.current) {
      emailjs
        .sendForm(
          env.NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY || "",
          env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_KEY || "",
          form.current,
          {
            publicKey: env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            toast.success("Email sent");
            setPending(false);
          },
          (error) => {
            setPending(false);
            toast.success("Email failed", error);
            console.error("FAILED...", error.text);
          }
        );
    }
  },
};
