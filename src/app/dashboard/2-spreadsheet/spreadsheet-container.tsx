"use client";

import {
  ChatContext,
  ChatDispatchContext,
} from "@/app/dashboard/2-spreadsheet/chat-session-context";
import {
  chatReducer,
  initialState,
} from "@/app/dashboard/2-spreadsheet/chat-session-reducer";
import { Chat as SpreadsheetChat } from "@/components/2-spreadsheet/chat";
import { useReducer } from "react";

export function SpreadsheetContainer() {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={chat}>
      <ChatDispatchContext.Provider value={dispatch}>
        <SpreadsheetChat />
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}
