import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import MenuItems from "./MenuItems";
import TopLogo from "./TopLogo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.configs";

export const TopMenu = async () => {
  const user = await getUserServerSession();
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white py-2.5">
      <div className="px-6 flex items-top justify-between space-x-4">
        {/* <div className="flex flex-col justify-center items-center"> */}
        <TopLogo user={user} />
        {/* </div> */}

        {user && (
          <MenuItems
            email={session?.user?.email || "no-email"}
            roles={session?.user?.roles || ["no-role"]}
          />
        )}
      </div>
    </div>
  );
};
