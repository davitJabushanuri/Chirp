import { PrismaClient } from "@prisma/client";

import { NODE_ENV } from "@/config";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    errorFormat: "minimal",
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

if (NODE_ENV !== "production") global.prisma = prisma;
