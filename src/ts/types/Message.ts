export interface Message {
  id: string;
  content: string;
  role: "human" | "ai";
  error: any;
  parallelGroupId?: string;
  blocks?: Message[];
}
