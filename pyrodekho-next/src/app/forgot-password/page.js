import Header from "@/components/Header";
import ForgotPasswordView from "@/views/ForgotPasswordView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Forgot Password",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <ForgotPasswordView />
    </>
  );
}
