"use client";

import { ChatContext } from "@/app/dashboard/1-rearrange/chat-session-context";
import { ChatList } from "@/components/1-rearrange/chat-list";
import { ChatPanel } from "@/components/1-rearrange/chat-panel";
import { EmptyScreen } from "@/components/1-rearrange/empty-screen";
import { useScrollAnchor } from "@/shared/hooks/use-scroll-anchor";
import { cn } from "@/shared/utils";
import { useContext, useEffect, useState } from "react";
import CustomizeSwarmDrawer from "@/components/1-rearrange/customize-swarm-drawer";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export interface ChatProps extends React.ComponentProps<"div"> {}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [topNavElClientHeight, setTopNavElClientHeight] = useState(0);
  const chatState = useContext(ChatContext);
  const { messagesRef, scrollRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [chatState.blocks, scrollToBottom]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const topNavEl = document?.getElementById("dashboard-sticky-top-nav");
    setTopNavElClientHeight(topNavEl?.clientHeight || 0);
  }, []);

  return (
    <>
      <div
          className={`fixed top-16 right-0 m-4`}
          onClick={toggleDrawer}
        >
          <Cog6ToothIcon className="w-6 h-6 text-black cursor-pointer group-hover:text-gray-700" />
      </div>
      <div
        className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
        ref={scrollRef}
      >
        <div className={cn("pb-[200px]", className)} ref={messagesRef}>
          {chatState.blocks.length ? (
            <ChatList
              blocks={chatState.blocks}
              isCompletionLoading={chatState.completionLoading}
            />
          ) : (
            <EmptyScreen />
          )}
        </div>
        <ChatPanel
          sessionId={chatState.sessionId}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
      
      <div className="mt-8">
        <CustomizeSwarmDrawer topNavHeight={topNavElClientHeight} open={drawerOpen} setOpen={setDrawerOpen}/>
      </div>
    </>
  );
}
