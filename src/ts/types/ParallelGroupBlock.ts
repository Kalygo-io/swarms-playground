import { Block } from "@/ts/types/Block";

export interface ParallelGroupBlock {
  id: string;
  type: "group";
  error: any;
  runId: string;
  parallelGroupId: string;
  agentName: string;
  blocks: Block[];
  content: string;
}

