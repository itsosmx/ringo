"use client";
import { Loader, MeetingRoom, MeetingSetup, useCallById } from "@/components";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React from "react";

export default function CurrentMeeting({ params }: { params: { meetingId: string } }) {
  const { user, isLoaded } = useUser();
  const { call, isCallPending } = useCallById(params.meetingId);
  const [isSettingUp, setIsSettingUp] = React.useState(true);

  if (isCallPending || !isLoaded) return <Loader />;
  return (
    <section className="h-screen">
      <StreamCall call={call}>
        <StreamTheme>{isSettingUp ? <MeetingSetup /> : <MeetingRoom />}</StreamTheme>
      </StreamCall>
    </section>
  );
}
