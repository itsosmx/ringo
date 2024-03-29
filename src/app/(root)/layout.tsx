import StreamProvider from "@/providers/StreamProvider";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <StreamProvider>{children}</StreamProvider>;
}
