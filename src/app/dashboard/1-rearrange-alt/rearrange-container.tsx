"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/1-rearrange/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/1-rearrange/chat-session-reducer";
import { Chat as RearrangeSwarmChat } from "@/components/1-rearrange/chat";
import { useReducer } from "react";

export function RearrangeContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <RearrangeSwarmChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
