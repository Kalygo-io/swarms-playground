import { Action } from "@/app/dashboard/1-sequential/chat-session-reducer";
import { nanoid } from "@/shared/utils";
import React from "react";

export async function callSequentialSwarm(
  sessionId: string,
  prompt: string,
  dispatch: React.Dispatch<Action>
) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/rearrange-swarm/completion`,
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
      dispatchEventToState(parsedChunk, dispatch, accMessage);
    } catch (e) {
      // debugger
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
  accMessage: { content: string }
) {

  console.log('dispatchEventToState', parsedChunk)

  console.log('accMessage.content', accMessage.content)

  const messageId = parsedChunk["run_id"]
  const agentName = parsedChunk["agent_name"]

  if (parsedChunk["event"] === "on_chat_model_start") {
    // debugger

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: messageId,
        agentName: agentName,
        content: "",
        role: "ai",
        error: null,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_stream") {
    accMessage.content += parsedChunk["data"];
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        id: messageId,
        content: accMessage.content,
      },
    });
  } else if (parsedChunk["event"] === "on_chat_model_end") {
    console.log('LLM END')
    accMessage.content = ""
  } else {
    console.error("Unknown event:", parsedChunk["event"]);
  }
}
