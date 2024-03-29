import React from "react";

export default function CurrentMeeting({ params }: { params: { meetingId: string } }) {
  return <div>Meeting: {params.meetingId}</div>;
}
