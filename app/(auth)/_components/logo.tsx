import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

import React from "react";

export const Logo = () => {
  return (
    <div className={cn("flex flex-col items-center gap-y-4", font.className)}>
      <div className="bg-white rounded-full p-1">
        <Image src="/spooky.svg" alt="Brogramer" height="80" width="80" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">Brogramer</p>
        <p className="text-sm text-muted-foreground">Let&apos;s Code</p>
      </div>
    </div>
  );
};
