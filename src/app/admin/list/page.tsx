import { addLink } from "@/actions/link_actions/actions";
import { authOptions } from "@/auth.configs";
import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import { Drawer, SocialTable } from "@/components";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function AdminPage() {
  const SocialLinks = await prisma.link.findMany();
  const session = await getServerSession(authOptions);

  const isAdmin = Boolean(
    session?.user?.roles?.find(
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
