import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ringo | Virtual Meeting Space",
  keywords:
    "Ringo, ConnectSphere, virtual meeting, video conferencing, web application, online collaboration, video chat, business conference, educational webinar, screen sharing, remote work, virtual classroom, browser-based meeting.",
  description:
    "Ringo is a leading-edge web application designed to bridge distances and bring people together. With crystal-clear video and audio, interactive collaboration tools, and seamless integration with your calendar, makes virtual meetings effortless and engaging. Whether it's for business conferences, educational classes, or casual catch-ups, delivers a reliable and immersive meeting experience directly from your browser. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorText: "#fff",
            colorBackground: "#242247",
            colorPrimary: "#8871e6",
            colorInputBackground: "#393760",
            colorInputText: "#fff",
            colorTextOnPrimaryBackground: "#fff",
          },
        }}>
        <body className={cn(inter.className, "bg-dark-1 text-white")}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
