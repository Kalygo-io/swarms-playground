"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/experiment-1/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/experiment-1/chat-session-reducer";
import { Chat as StreamingWithMemoryChat } from "@/components/experiment-1/chat";
import { useReducer } from "react";

export function NoRagContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <StreamingWithMemoryChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
