"use client";
import { routes } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="container col-span-1">
      <div className="flex flex-col gap-2 py-4">
        {routes.sidebar.map((route) => {
          const isActive = pathname === route.path || pathname.startsWith(`${route.path}/`);
          return (
            <Link
              href={route.path}
              key={route.name}
              className={cn("flex items-center gap-4 font-semibold text-sm p-4 py-2 rounded-2xl hover:bg-primary transition-all", {
                "bg-primary": isActive,
              })}>
              <route.icon />
              <p>{route.name}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
