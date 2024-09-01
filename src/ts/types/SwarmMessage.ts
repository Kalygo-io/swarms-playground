export interface SwarmMessage {
  id: string;
  content: string;
  role: "human" | "ai";
  agentName?: string;
  error: any;
}
