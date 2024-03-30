import { RandomColor, cn } from "@/lib/utils";
import React from "react";

interface ShowButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ShowButton({ icon, title, description, ...props }: ShowButtonProps) {
  return (
    <button
      style={{ backgroundColor: RandomColor() }}
      className={cn("p-4 h-[200px] w-full rounded-2xl flex flex-col justify-between hover:brightness-95 transition-all")}
      {...props}>
      {icon}
      <div className="text-left">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </button>
  );
}
