import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import { UsersTable } from "@/components/usersTable/UsersTable";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const users = await prisma.user.findMany();
  const userLogged = await getUserServerSession();

  return (
    <div>
      <div className="p-[25px]">
        <span className="text-2xl ">Lista de Usuarios</span>
      </div>

      <div className="flex items-center table-container">
        <UsersTable usersList={users} userLogged={userLogged} />
      </div>
    </div>
  );
}
