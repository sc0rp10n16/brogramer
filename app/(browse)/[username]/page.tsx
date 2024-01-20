import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  const isWingman = await isFollowingUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>userID: {user.id}</p>
      <p>Is Wingman: {`${isWingman}`}</p>
      <Actions userID={user.id} isWingman={isWingman} />
    </div>
  );
};

export default UserPage;
