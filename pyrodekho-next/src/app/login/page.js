import { Suspense } from "react";
import Header from "@/components/Header";
import LoginView from "@/views/LoginView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Login",
  description: "Login to your PyroDekho account.",
  path: "/login",
});

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
