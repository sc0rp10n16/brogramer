"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isWingman: boolean;
  userID: string;
}

export const Actions = ({ isWingman, userID }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userID)
        .then((data) =>
          toast.success(`You are now wingman to ${data.wingman.username}`),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userID)
        .then((data) =>
          toast.success(
            `You are not wingman to ${data.wingman.username} anymone`,
          ),
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const onClick = () => {
    if (isWingman) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isWingman ? "Un-Bro" : "Become Wingman"}
    </Button>
  );
};
