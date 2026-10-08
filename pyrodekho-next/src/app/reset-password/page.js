import { Suspense } from "react";
import Header from "@/components/Header";
import ResetPasswordView from "@/views/ResetPasswordView";

export const metadata = {
  title: "Reset Password",
};

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
