import {
  CallControls,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  CallParticipantsList,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
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
import EndCallButton from "./EndCallButton";
import { Loader } from "..";

export default function MeetingRoom() {
  const [layout, setLayout] = React.useState<LayoutProps>("speaker-left");
  const [showParticipants, setShowParticipants] = React.useState(false); // [1
  const { useCallCallingState } = useCallStateHooks();
  const callState = useCallCallingState();

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

  if (callState != CallingState.JOINED) return <Loader />;

  return (
    <div className="h-screen w-full flex-center gap-4 relative">
      <div className="size-full flex-center max-w-[1080px] relative">
        {CallLayout()}

        <div
          className={cn("h-screen hidden w-full max-w-[350px] ease-in fixed right-0 bg-dark-2 p-8", {
            "animate-slide-in-block block": showParticipants,
          })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="flex gap-4 items-center fixed bottom-8 flex-wrap">
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
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="bg-dark-2 p-3 rounded-full hover:scale-105 active:scale-95 cursor-pointer">
          <FaUser className="text-xl text-white" />
        </button>
        <EndCallButton />
      </div>
    </div>
  );
}

type LayoutProps = "grid" | "speaker-left" | "speaker-right";
