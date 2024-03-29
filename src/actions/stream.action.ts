"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET_KEY as string;


export async function tokenProvider() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");

    const streamClient = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60


    const token = streamClient.createToken(user.id, exp, issued)

    return token;

  } catch (error) {
    console.error(error);
    return null;
  }
}