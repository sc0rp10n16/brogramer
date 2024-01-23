import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();
    const followedUsers = db.follow.findMany({
      where: {
        broId: self.id,
      },
      include: {
        wingman: true,
      },
    });
    return followedUsers;
  } catch {
    return [];
  }
};

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("Bro not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        broId: self.id,
        wingmanId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();
  const otherBro = await db.user.findUnique({
    where: { id },
  });
  if (!otherBro) {
    throw new Error("Bro not found!");
  }
  if (otherBro.id === self.id) {
    throw new Error("A bro can't be his wingman");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      broId: self.id,
      wingmanId: otherBro.id,
    },
  });
  if (existingFollow) {
    throw new Error("Already your wingman");
  }

  const follow = await db.follow.create({
    data: {
      broId: self.id,
      wingmanId: otherBro.id,
    },
    include: {
      wingman: true,
      bro: true,
    },
  });
  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherBro = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherBro) {
    throw new Error("Bro not found");
  }

  if (otherBro.id === self.id) {
    throw new Error("cannot unbro yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      broId: self.id,
      wingmanId: otherBro.id,
    },
  });
  if (!existingFollow) {
    throw new Error("you are now bro's wingman");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      wingman: true,
    },
  });

  return follow;
};
