import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useCallById(id: string) {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | undefined>(undefined);
  const [isCallPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return setError("Client not found");
    const fetchCall = async () => {
      setIsPending(true);
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id
        }
      });
      if (calls.length) setCall(calls[0])
      setIsPending(false);
    }
    fetchCall();

  }, [client, id])

  console.log(call, error, isCallPending);
  

  return { call, error, isCallPending } as const;
}
