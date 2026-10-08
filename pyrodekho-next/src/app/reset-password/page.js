import { Suspense } from "react";
import Header from "@/components/Header";
import ResetPasswordView from "@/views/ResetPasswordView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reset Password",
  path: "/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      {/* Reads ?token= from the URL */}
      <Suspense>
        <ResetPasswordView />
      </Suspense>
    </>
  );
}
