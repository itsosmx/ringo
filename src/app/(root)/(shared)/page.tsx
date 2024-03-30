"use client";
import { ShowButton } from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { BiSolidVideoRecording } from "react-icons/bi";
import { FaSignInAlt } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const router = useRouter();
  const { user } = useUser();
  const [meeting, setMeeting] = useState({
    date: new Date(),
    description: "",
    link: "",
  });
  const [meetingDetails, setMeetingDetails] = useState<Call>();

  async function createMeeting() {
    try {
      if (!client || !user) return;
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Call not found");

      await call.getOrCreate({
        data: {
          starts_at: meeting.date.toISOString() || new Date().toISOString(),
          custom: {
            description: meeting.description || "",
            host: user.id,
          },
        },
      });
      setMeetingDetails(call);
      if (!meeting.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ variant: "default", title: "Creating meeting...", description: "Please wait." });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[350px] w-full relative rounded-2xl overflow-hidden">
        <div className="size-full absolute top-0 left-0 z-10 p-14">
          <h1 className="text-4xl font-bold text-white p-4">Welcome to Ringo</h1>
          <p className="text-white p-4">Create, join and manage meetings with ease.</p>
        </div>
        <Image src="/assets/hero.png" fill alt="hero" className="w-full object-cover brightness-50"></Image>
      </div>
      <ShowButton icon={<MdCreate className="text-4xl" />} title="Create Meeting" description="Create meeting with your settings.">
        <div className="flex-center flex-col gap-4">
          <p className="font-bold text-lg">Still not developed. Please wait for the next update.</p>
        </div>
      </ShowButton>
      <section className="flex gap-4 justify-between">
        <ShowButton icon={<FaPlus className="text-4xl" />} title="Instant Meeting" description="Start an instant meeting.">
          <div className="flex-center flex-col gap-4">
            <p className="font-bold text-lg">Create instant meeting.</p>
            <Button onClick={createMeeting}>Create Meeting</Button>
          </div>
        </ShowButton>
        <ShowButton icon={<FaSignInAlt className="text-4xl" />} title="Join Meeting" description="Join meeting via invitation link">
          <div className="flex-center flex-col gap-4">
            <p className="font-bold text-lg">Still not developed. Please wait for the next update.</p>
          </div>
        </ShowButton>
        <ShowButton icon={<GrSchedule className="text-4xl" />} title="Schedule Meeting" description="Schedule a meeting.">
          <div className="flex-center flex-col gap-4">
            <p className="font-bold text-lg">Still not developed. Please wait for the next update.</p>
          </div>
        </ShowButton>
        <ShowButton icon={<BiSolidVideoRecording className="text-4xl" />} title="View Recorded" description="View latest recorded meetings.">
          <div className="flex-center flex-col gap-4">
            <p className="font-bold text-lg">Still not developed. Please wait for the next update.</p>
          </div>
        </ShowButton>
      </section>
    </div>
  );
}
