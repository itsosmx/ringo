"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function EndCallButton() {
  const call = useCall();
  const router = useRouter();
  const { toast } = useToast();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

  async function handleEnd() {
    await call?.endCall();
    router.push("/");
    toast({ title: "Call ended" });
  }

  if (!isOwner) return null;
  return (
    <Button variant="destructive" onClick={handleEnd}>
      End Call
    </Button>
  );
}
