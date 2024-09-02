export interface Block {
  id: string;
  content: string;
  type: "prompt" | "ai";
  error: any;
  agentName?: string;
}

