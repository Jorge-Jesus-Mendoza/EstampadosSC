import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import { TopMenu } from "@/components";
import { redirect } from "next/navigation";

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
