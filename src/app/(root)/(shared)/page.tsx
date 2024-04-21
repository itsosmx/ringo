"use client";
import { ShowButton } from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus, FaSignInAlt } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { BiSolidVideoRecording } from "react-icons/bi";
import { MdCreate } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";

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
      toast({ variant: "default", title: "Creating meeting...", description: "Please wait." });
      if (!meeting.description) {
        router.push(`/meeting/${call.id}`);
      } else {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`);
        toast({ variant: "default", title: "Meeting link copied", description: "Your meeting has been schedule to" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function joinMeeting() {}
  function scheduleMeeting() {}

  return (
    <div className="flex flex-col gap-4 ">
      <div className="h-[350px] w-full relative rounded-2xl overflow-hidden">
        <div className="size-full absolute top-0 left-0 z-10 p-14">
          <h1 className="text-4xl font-bold text-white p-4">Welcome to Ringo</h1>
          <p className="text-white p-4">Create, join and manage meetings with ease.</p>
        </div>
        <Image src="/assets/hero.png" fill alt="hero" className="w-full object-cover brightness-50"></Image>
      </div>
      <ShowButton icon={<MdCreate className="text-4xl" />} title="Create Meeting" description="Create meeting with your settings."></ShowButton>
      <section className="flex gap-4 justify-between">
        <ShowButton icon={<FaPlus className="text-4xl" />} title="Instant Meeting" description="Start an instant meeting.">
          <div className="flex-center flex-col gap-4">
            <p className="font-bold text-lg">Create instant meeting.</p>
            <Button onClick={createMeeting}>Start Meeting</Button>
          </div>
        </ShowButton>
        <ShowButton icon={<FaSignInAlt className="text-4xl" />} title="Join Meeting" description="Join meeting via invitation link">
          <div className="flex-center flex-col gap-4">
            <p className="font-bold text-lg">Still not developed. Please wait for the next update.</p>
          </div>
        </ShowButton>
        <ShowButton icon={<GrSchedule className="text-4xl" />} title="Schedule Meeting" description="Schedule a meeting.">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Create Meeting</p>
            <Textarea
              className="bg-dark-3 border-none"
              placeholder="Meeting Description"
              value={meeting.description}
              onChange={(e) => setMeeting((prev) => ({ ...prev, description: e.target.value }))}
            />
            <DatePicker
              className="bg-dark-3 w-full p-2 rounded-lg focus:outline-none"
              selected={meeting.date}
              onChange={(date) => setMeeting((prev) => ({ ...prev, date }))}
              showTimeSelect
              timeIntervals={15}
              timeFormat="HH:mm"
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Button onClick={createMeeting}>Schedule Meeting</Button>
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
