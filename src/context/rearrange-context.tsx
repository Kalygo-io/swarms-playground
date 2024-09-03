"use client";

import React, { createContext, useState, useContext } from "react";

interface IRearrangeSwarmContext {
  context: {
    agents: any;
    flow: string;
  };
  setRearrangeSwarmContext: React.Dispatch<
    React.SetStateAction<{
      agents: any;
      flow: string;
    }>
  >;
}

const RearrangeSwarmContext = createContext<IRearrangeSwarmContext | undefined>(
  undefined
);

export const RearrangeSwarmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<{
    agents: Record<string, { name: string; system_prompt: string }>;
    flow: string;
  }>({
    agents: {
      "0": {
        name: "J.K. Rowling",
        system_prompt: "Write like J.K. Rowling",
      },
      "1": {
        name: "Stephen King",
        system_prompt: "Write like Stephen King",
      },
      "2": {
        name: "Reviewer",
        system_prompt: "Judge who produced the best output",
      },
    },
    flow: "J.K. Rowling, Stephen King -> Reviewer",
  });

  return (
    <RearrangeSwarmContext.Provider
      value={{ context: data, setRearrangeSwarmContext: setData }}
    >
      {children}
    </RearrangeSwarmContext.Provider>
  );
};

// Custom hook to use the context
export const useRearrangeSwarmContext = () => {
  const context = useContext(RearrangeSwarmContext);

  if (context === undefined) {
    throw new Error("Custom Hook must be used within the relevant Provider");
  }
  return context;
};
