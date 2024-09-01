import { Action } from "@/app/dashboard/1-sequential/chat-session-reducer";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callSequentialSwarm(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/sequential-swarm/completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
        content: prompt,
      }),
      credentials: "include",
    }
  );

  if (!resp.ok) throw "Network response was not OK";

  const reader = resp?.body?.getReader();

  const decoder = new TextDecoder();

  const swarmSessionId = nanoid();
  let accMessage = {
    content: "",
  };

  while (true) {
    // @ts-ignore
    const { done, value } = await reader.read();
    if (done) break;
    let chunk = decoder.decode(value);

    try {
      const parsedChunk = JSON.parse(chunk);
      dispatchEventToState(parsedChunk, dispatch, swarmSessionId, accMessage);
    } catch (e) {
      let multiChunkAcc = "";

      let idx = 0;
      while (0 < chunk.length) {
        if (chunk[idx] === "}") {
          try {
            multiChunkAcc += chunk[idx];
            const parsedChunk = JSON.parse(multiChunkAcc);

            dispatchEventToState(
              parsedChunk,
              dispatch,
              swarmSessionId,
              accMessage
            );

            chunk = chunk.substring(idx + 1);
            idx = 0;
            multiChunkAcc = "";
          } catch (e) {
            multiChunkAcc += chunk.substring(0, idx);
          }
        } else {
          multiChunkAcc += chunk[idx];
          idx++;
        }
      }
    }
  }
}

function dispatchEventToState(
  parsedChunk: Record<string, string>,
  dispatch: React.Dispatch<Action>,
  swarmSessionId: string,
  accMessage: { content: string }
) {

  console.log('dispatchEventToState', parsedChunk)

  console.log('accMessage.content', accMessage.content)

  const messageId = parsedChunk["run_id"]

  if (parsedChunk["event"] === "on_llm_start") {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {

        id: messageId,
        content: "",
        role: "ai",
        error: null,
      },
    });
  } else if (parsedChunk["event"] === "on_llm_stream") {
    accMessage.content += parsedChunk["data"];
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: messageId,
        content: accMessage.content,
      },
    });
  } else if (parsedChunk["event"] === "on_llm_end") {
    console.log('LLM END')
    accMessage.content = ""
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
