import { CallControls, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBoxes, FaUser } from "react-icons/fa";

export default function MeetingRoom() {
  const [layout, setLayout] = React.useState<LayoutProps>("speaker-left");
  const [showParticipants, setShowParticipants] = React.useState(false); // [1

  function toggleLayout() {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  }

  return (
    <div className="h-screen w-full flex-center flex-col gap-4">
      <div>{toggleLayout()}</div>
      <div className="flex gap-4 items-center fixed bottom-8">
        <CallStatsButton />
        <CallControls />
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-dark-2 p-3 rounded-full">
            <FaBoxes className="text-xl text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Layouts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLayout("grid")}>Grid</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLayout("speaker-left")}>Left</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLayout("speaker-right")}>Right</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={() => setShowParticipants((prev) => !prev)} className="bg-dark-2 p-3 rounded-full">
          <FaUser className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
}

type LayoutProps = "grid" | "speaker-left" | "speaker-right";
