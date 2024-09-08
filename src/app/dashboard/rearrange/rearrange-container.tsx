"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/rearrange/chat-session-context";
import {
  Action,
  chatReducer,
  initialState,
} from "@/app/dashboard/rearrange/chat-session-reducer";
import { Chat as RearrangeSwarmChat } from "@/components/rearrange/chat";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { useReducer } from "react";

export function RearrangeContainer() {
  const [chat, dispatch] = useReducer<
    (
      state: {
        blocks: BlocksUnion[];
        completionLoading: boolean;
        sessionId: string;
      },
      action: Action
    ) => {
      blocks: BlocksUnion[];
      completionLoading: boolean;
      sessionId: string;
    }
  >(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <RearrangeSwarmChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
