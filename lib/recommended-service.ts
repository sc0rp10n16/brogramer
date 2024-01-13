import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { resolve } from "path";

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
