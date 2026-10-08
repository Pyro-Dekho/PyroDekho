import { Suspense } from "react";
import Header from "@/components/Header";
import LoginView from "@/views/LoginView";

export const metadata = {
  title: "Login",
  description: "Login to your PyroDekho account.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      {/* Reads ?redirect= from the URL */}
      <Suspense>
        <LoginView />
      </Suspense>
    </>
  );
}
