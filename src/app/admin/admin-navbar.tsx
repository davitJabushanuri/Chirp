"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

export const AdminNavbar = () => {
  const pathname = usePathname();
  const path = pathname.split("/").at(-1);

  return (
    <nav aria-label="Admin" className="flex gap-4">
      <Link
        className={cn(
          "cursor-pointer font-medium",
          path === "admin" && "font-bold",
        )}
        href="/admin"
      >
        Dashboard
      </Link>
      <Link
        className={cn(
          "cursor-pointer font-medium",
          path === "logs" && "font-bold",
        )}
        href="/admin/logs"
      >
        Logs
      </Link>
    </nav>
  );
};
