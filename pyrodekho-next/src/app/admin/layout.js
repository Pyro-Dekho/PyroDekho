import AdminRoute from "@/components/AdminRoute";

// Admin pages are private: keep them out of search results
export const metadata = {
  title: {
    default: "Admin",
    template: "%s | PyroDekho Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminRoute>{children}</AdminRoute>;
}
