import { AdminNav } from "@/components/layout/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminNav />
      <main className="px-4 py-8 sm:px-7 lg:ml-64 lg:px-10 lg:py-10">
        {children}
      </main>
    </div>
  );
}
