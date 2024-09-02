export interface SwarmParallelMessage {
  id: string;
  parallelGroupId: string;
  content: string;
  role: "human" | "ai";
  agentName?: string;
  error: any;
}