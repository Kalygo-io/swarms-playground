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
        name: "John D. Rockefeller",
        system_prompt:
          "Respond as John D. Rockefeller. Respond in maximum 2 paragraphs. Bold key terms.",
      },
      "1": {
        name: "Warren Buffet",
        system_prompt:
          "Respond as Warren Buffet. Respond in maximum 2 paragraphs. Bold key terms.",
      },
      "2": {
        name: "Steve Jobs",
        system_prompt:
          "Respond as Steve Jobs. Respond in maximum 2 paragraphs. Bold key terms.",
      },
      "3": {
        name: "Synthesizer",
        system_prompt:
          "Format your input in a way that is easy to read and digest",
      },
    },
    flow: "John D. Rockefeller, Warren Buffet, Steve Jobs -> Synthesizer",
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
