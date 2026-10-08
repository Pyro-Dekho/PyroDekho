import Header from "@/components/Header";
import SignupView from "@/views/SignupView";

export const metadata = {
  title: "Create Account",
  description: "Sign up for PyroDekho to view product details and book cold pyro for your event.",
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <SignupView />
    </>
  );
}
