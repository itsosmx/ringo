"use client";
import { Loader, MeetingRoom, MeetingSetup, useCallById } from "@/components";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React from "react";

export default function CurrentMeeting({ params }: { params: { meetingId: string } }) {
  const { user, isLoaded } = useUser();
  const { call, isCallPending } = useCallById(params.meetingId);
  const [isSetupComplete, setIsSetupComplete] = React.useState(false);

  console.log(isSetupComplete);

  if (isCallPending || !isLoaded) return <Loader />;
  return (
    <section className="h-screen">
      <StreamCall call={call}>
        <StreamTheme>{isSetupComplete ? <MeetingRoom /> : <MeetingSetup setIsSetupComplete={setIsSetupComplete} />} </StreamTheme>
      </StreamCall>
    </section>
  );
}
