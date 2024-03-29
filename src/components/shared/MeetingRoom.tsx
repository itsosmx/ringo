import { CallControls, CallStatsButton, PaginatedGridLayout, SpeakerLayout, CallParticipantsList } from "@stream-io/video-react-sdk";
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
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function MeetingRoom() {
  const [layout, setLayout] = React.useState<LayoutProps>("speaker-left");
  const [showParticipants, setShowParticipants] = React.useState(false); // [1

  function CallLayout() {
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
    <div className="h-screen w-full flex-center gap-4 relative">
      <div className="size-full flex-center max-w-[1080px] relative">{CallLayout()}</div>

      <div className="flex gap-4 items-center fixed bottom-8">
        <CallStatsButton />
        <CallControls />
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-dark-2 p-3 rounded-full hover:scale-105 active:scale-95 cursor-pointer">
            <FaBoxes className="text-xl text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Layouts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-100" onClick={() => setLayout("grid")}>
              Grid
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-100" onClick={() => setLayout("speaker-left")}>
              Left
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-slate-100" onClick={() => setLayout("speaker-right")}>
              Right
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger
            onClick={() => setShowParticipants((prev) => !prev)}
            className="bg-dark-2 p-3 rounded-full hover:scale-105 active:scale-95 cursor-pointer">
            <FaUser className="text-xl text-white" />
          </SheetTrigger>
          <SheetContent className="p-8">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </SheetContent>
        </Sheet>

        {/* <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="bg-dark-2 p-3 rounded-full hover:scale-105 active:scale-95 cursor-pointer">
          <FaUser className="text-xl text-white" />
        </button> */}
      </div>
    </div>
  );
}

type LayoutProps = "grid" | "speaker-left" | "speaker-right";
