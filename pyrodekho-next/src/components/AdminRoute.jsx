"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const ADMIN_EMAILS = [
  "shivam8130752247@gmail.com",
];

const subscribe = () => () => {};

// Where to send the visitor, or null if they are an admin
const getRedirect = (token) => {
  if (!token) return "/login";

  try {
    const decoded = jwtDecode(token);
    return ADMIN_EMAILS.includes(decoded.email) ? null : "/";
  } catch (err) {
    console.error("Invalid token", err);
    return "/login";
  }
};

// Token lives in localStorage, so the check can only run in the browser.
// On the server (and during hydration) the token is `undefined` and nothing renders.
const AdminRoute = ({ children }) => {
  const router = useRouter();
  const token = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("token"),
    () => undefined,
  );

  const redirectTo = token === undefined ? null : getRedirect(token);

  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (token === undefined || redirectTo) return null;
  return children;
};

export default AdminRoute;
