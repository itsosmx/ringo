"use client";
import { ShowButton } from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

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
    <div>
      <section className="flex gap-4 justify-between">
        <ShowButton onClick={createMeeting} icon={<FaPlus className="text-4xl" />} title="New Meeting" description="Start an instant meeting." />
        <ShowButton icon={<FaPlus className="text-4xl" />} title="New Meeting" description="Start an instant meeting." />
        <ShowButton icon={<FaPlus className="text-4xl" />} title="New Meeting" description="Start an instant meeting." />
        <ShowButton icon={<FaPlus className="text-4xl" />} title="New Meeting" description="Start an instant meeting." />
      </section>
    </div>
  );
}
