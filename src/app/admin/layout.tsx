import { TopMenu } from "@/components";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-dashboard">
      <TopMenu />
      {children}
    </div>
  );
}
