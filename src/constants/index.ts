import { RiHome2Line } from "react-icons/ri";
import { SlCamrecorder } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { RiChatPrivateLine } from "react-icons/ri";

export const routes = {
  sidebar: [
    {
      name: "Home",
      path: "/",
      icon: RiHome2Line,
    },
    {
      name: "Rooms",
      path: "/rooms",
      icon: RiChatPrivateLine,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: IoSettingsOutline ,
    },
    {
      name: "Recordings",
      path: "/recordings",
      icon: SlCamrecorder,
    }
  ]
}