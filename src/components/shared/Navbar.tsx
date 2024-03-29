import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky h-16 flex items-center bg-dark-2">
      <div className="container flex justify-between">
        <Link className="font-bold text-2xl" href="/">
          <h1>Zoom</h1>
        </Link>
        <UserButton />
      </div>
    </header>
  );
}
