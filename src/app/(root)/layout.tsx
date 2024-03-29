import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import StreamProvider from "@/providers/StreamProvider";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <section className="grid grid-cols-5 h-screen-2">
        <Sidebar />
        <div className="p-4 overflow-y-auto col-span-4">
          <StreamProvider>{children}</StreamProvider>
        </div>
      </section>
    </div>
  );
}
