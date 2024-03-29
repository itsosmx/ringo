import React from "react";

interface ShowButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ShowButton({ icon, title, description, ...props }: ShowButtonProps) {
  return (
    <button
      className="bg-orange-400 p-4 h-[200px] w-[250px] rounded-2xl flex flex-col justify-between hover:scale-105 active:scale-95 transition-all"
      {...props}>
      {icon}
      <div className="text-left">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </button>
  );
}
