import { Action } from "@/app/dashboard/rearrange/chat-session-reducer";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callSwarmDesigner(prompt: string) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/api/swarm-designer/design-swarm`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      credentials: "include",
    }
  );

  if (!resp.ok) throw "Network response was not OK";
}
