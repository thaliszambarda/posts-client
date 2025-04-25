import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user.provider";

export default function Dashboard() {
  const { user, setUser } = useUser();

  setUser({ name: "John Doe" });

  return (
    <>
      <Button className="bg-blue-500">user: {user?.name}</Button>
    </>
  );
}
