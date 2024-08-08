import { addLink } from "@/actions/link_actions/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import { Drawer, SocialTable } from "@/components";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const SocialLinks = await prisma.link.findMany();
  const user = await getUserServerSession();

  const isAdmin = Boolean(
    user?.roles.find(
      (userRole: string) => userRole === "admin" || userRole === "super-user"
    )
  );

  const columnsToHide = [`${!isAdmin ? "id" : ""}`];

  return (
    <div>
      <Drawer ServerAction={addLink} isCreate isAdmin={isAdmin} />

      <div className="p-[25px]">
        <span className="text-2xl ">Lista de Enlaces</span>
      </div>

      <div className="flex items-center table-container">
        <SocialTable
          links={SocialLinks}
          isAdmin={isAdmin}
          columnsToHide={columnsToHide}
        />
      </div>
    </div>
  );
}
