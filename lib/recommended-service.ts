import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { resolve } from "path";

export const getRecommended = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
