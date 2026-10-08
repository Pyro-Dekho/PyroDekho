import Header from "@/components/Header";
import ForgotPasswordView from "@/views/ForgotPasswordView";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <ForgotPasswordView />
    </>
  );
}
