import { createContext, Dispatch } from "react";
import {
  Action,
  initialState,
} from "@/app/dashboard/spreadsheet/chat-session-reducer";

export const ChatContext = createContext(initialState);
export const ChatDispatchContext = createContext<Dispatch<Action>>(() => null);
