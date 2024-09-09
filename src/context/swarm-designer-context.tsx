"use client";

import React, { createContext, useState, useContext } from "react";

interface ISwarmDesignerContext {
  context: {
    agents: any;
    flow: string;
  };
  setSwarmDesignerContext: React.Dispatch<
    React.SetStateAction<{
      agents: any;
      flow: string;
    }>
  >;
}

const SwarmDesignerContext = createContext<ISwarmDesignerContext | undefined>(
  undefined
);

export const SwarmDesignerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<{
    agents: Record<string, { name: string; system_prompt: string }>;
    flow: string;
  }>({
    agents: {},
    flow: "",
  });

  return (
    <SwarmDesignerContext.Provider
      value={{ context: data, setSwarmDesignerContext: setData }}
    >
      {children}
    </SwarmDesignerContext.Provider>
  );
};

// Custom hook to use the context
export const useSwarmDesignerContext = () => {
  const context = useContext(SwarmDesignerContext);

  if (context === undefined) {
    throw new Error("Custom Hook must be used within the relevant Provider");
  }
  return context;
};
