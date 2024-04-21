import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky h-16 flex items-center">
      <div className="container flex justify-between">
        <Link className="font-bold text-2xl" href="/">
          <h1>
            Ring
            <span className="text-primary">O</span>
          </h1>
        </Link>
        <UserButton
          showName
          appearance={{
            elements: {
              button: {
                color: "white",
                background: "#242247",
              },
            },
            variables: {
              colorText: "white",
              colorBackground: "#2E2C54",
            },
          }}
        />
      </div>
    </header>
  );
}
