"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/1-sequential/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/1-sequential/chat-session-reducer";
import { Chat as StreamingWithMemoryChat } from "@/components/1-sequential/chat";
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
