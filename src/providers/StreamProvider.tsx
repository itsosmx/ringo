"use client";
import { tokenProvider } from "@/actions/stream.action";
import { Loader } from "@/components";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;

export default function StreamProvider({ children }: { children: React.ReactNode }) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // @ts-ignore
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}
