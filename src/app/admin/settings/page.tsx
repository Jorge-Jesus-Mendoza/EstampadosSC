import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import Form from "@/components/settings/Form";

export default async function NamePage(): Promise<JSX.Element> {
  const user = await getUserServerSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <Form email={user?.email || "no-email"} />
    </div>
  );
}
