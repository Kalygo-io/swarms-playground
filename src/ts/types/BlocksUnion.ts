import { Block } from "@/ts/types/Block";
import { ParallelGroupBlock } from "@/ts/types/ParallelGroupBlock";
import { DownloadLinkButtonBlock } from "@/ts/types/DownloadLinkButtonBlock";

export type BlocksUnion = Block | ParallelGroupBlock | DownloadLinkButtonBlock;
