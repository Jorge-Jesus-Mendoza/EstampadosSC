import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import MenuItems from "./MenuItems";
import Link from "next/link";

export const TopMenu = async () => {
  const user = await getUserServerSession();

  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white py-2.5">
      <div className="px-6 flex items-top justify-between space-x-4">
        {/* <div className="flex flex-col justify-center items-center"> */}
        <Link href={"/dashboard"}>
          <h5 className="text-gray-600 font-medium top-logo">Estampados SC</h5>
        </Link>
        {/* </div> */}

        {user && (
          <MenuItems
            email={user?.email || "no-email"}
            roles={user?.roles || ["no-role"]}
          />
        )}
      </div>
    </div>
  );
};
