import { VideoPreview, useCall } from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { Button } from "../ui/button";

export default function MeetingSetup({ onCompleted }: { onCompleted: () => void }) {
  const [isVideoToggle, setIsVideoToggle] = React.useState(false);
  const call = useCall();

  useEffect(() => {
    if (isVideoToggle) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isVideoToggle, call?.camera, call?.microphone]);

  return (
    <div className="h-screen w-full flex-center flex-col gap-4">
      <h1 className="text-2xl font-semibold">Meeting Setup</h1>
      {isVideoToggle ? (
        <div className="h-[480px] w-[640px] flex-center bg-dark-2">
          <BsFillCameraVideoOffFill className="text-9xl text-gray-700" />
        </div>
      ) : (
        <VideoPreview />
      )}
      <span className="ml-2">Join with mic and camera off</span>
      <div className="p-4 flex gap-8 items-center">
        <label htmlFor="enable-video" className="text-4xl">
          <input type="checkbox" id="enable-video" className="hidden" checked={isVideoToggle} onChange={() => setIsVideoToggle((prev) => !prev)} />
          {!isVideoToggle ? <FaMicrophone /> : <FaMicrophoneSlash className="text-red-600" />}
        </label>
        <label htmlFor="enable-video" className="text-4xl">
          <input type="checkbox" id="enable-video" className="hidden" checked={isVideoToggle} onChange={() => setIsVideoToggle((prev) => !prev)} />
          {!isVideoToggle ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill className="text-red-600" />}
        </label>
      </div>
      <Button onClick={onCompleted}>Join Meeting</Button>
    </div>
  );
}
