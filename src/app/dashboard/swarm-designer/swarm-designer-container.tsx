"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/swarm-designer/chat-session-context";
import {
  Action,
  chatReducer,
  initialState,
} from "@/app/dashboard/swarm-designer/chat-session-reducer";
import { Chat as SwarmDesignerChat } from "@/components/swarm-designer/chat";
import { BlocksUnion } from "@/ts/types/BlocksUnion";
import { useReducer } from "react";

export function SwarmDesignerContainer() {
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
        <SwarmDesignerChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
