import EmailGate from "@/components/EmailGate";

export const metadata = {
  title: "Log in · OverlayNow",
  description: "Enter your email to open the OverlayNow bench.",
};

export default function StartPage() {
  return <EmailGate heading="Log in to the bench" />;
}
