"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/rearrange/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/rearrange/chat-session-reducer";
import { Chat as RearrangeSwarmChat } from "@/components/rearrange/chat";
import { useReducer } from "react";

export function RearrangeContainer() {
  console.log("rearrange-container.tsx");

  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <RearrangeSwarmChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
