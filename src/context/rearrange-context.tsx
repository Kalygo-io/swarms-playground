"use client";

import { registerAccount } from "@/services/registerAccount";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

interface IRearrangeSwarmContext {
  data: {
    agents: any;
    flow: string;
  };
  setData: React.Dispatch<
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
    agents: any;
    flow: string;
  }>({
    agents: {},
    flow: "",
  });

  return (
    <RearrangeSwarmContext.Provider value={{ data, setData }}>
      {children}
    </RearrangeSwarmContext.Provider>
  );
};

// Custom hook to use the context
export const useRearrangeSwarmContext = () => {
  const context = useContext(RearrangeSwarmContext);

  if (context === undefined) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
