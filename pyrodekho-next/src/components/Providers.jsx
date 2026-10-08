"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";

function Providers({ children }) {
  return (
    <AuthProvider>
      <SearchProvider>
        {children}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
      </SearchProvider>
    </AuthProvider>
  );
}

export default Providers;
