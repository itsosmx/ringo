import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import React, { useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { Button } from "../ui/button";

export default function MeetingSetup({ setIsSetupComplete }: { setIsSetupComplete: any }) {
  const [isVideoToggle, setIsVideoToggle] = React.useState({
    video: true,
    audio: false,
  });
  const call = useCall();

  useEffect(() => {
    isVideoToggle.audio ? call?.microphone.disable() : call?.microphone.enable();
    isVideoToggle.video ? call?.camera.disable() : call?.camera.enable();
  }, [isVideoToggle, call?.camera, call?.microphone]);

  function handleOnJoin() {
    call?.join();
    setIsSetupComplete(true);
  }

  function toggleSetting(setting: "audio" | "video") {
    setIsVideoToggle((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  }

  return (
    <div className="h-screen w-full flex-center flex-col gap-4">
      <h1 className="text-2xl font-semibold">Meeting Setup</h1>
      {isVideoToggle.video ? (
        <div className="h-[480px] w-[640px] flex-center bg-dark-2">
          <BsFillCameraVideoOffFill className="text-9xl text-gray-700" />
        </div>
      ) : (
        <VideoPreview />
      )}
      <span className="ml-2 font-bold">Setup your join preference</span>
      <div className="p-4 flex gap-8 items-center">
        <label htmlFor="enable-audio" className="text-4xl">
          <input type="checkbox" id="enable-audio" className="hidden" checked={isVideoToggle.audio} onChange={() => toggleSetting("audio")} />
          {!isVideoToggle.audio ? <FaMicrophone /> : <FaMicrophoneSlash className="text-red-600" />}
        </label>
        <label htmlFor="enable-video" className="text-4xl">
          <input type="checkbox" id="enable-video" className="hidden" checked={isVideoToggle.video} onChange={() => toggleSetting("video")} />
          {!isVideoToggle.video ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill className="text-red-600" />}
        </label>
        <Button onClick={handleOnJoin}>Join Meeting</Button>
        <DeviceSettings />
      </div>
    </div>
  );
}
