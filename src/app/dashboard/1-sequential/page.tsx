"use server";

import { redirect } from "next/navigation";
import { NoRagContainer } from "./no-rag-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    
    console.log('experiment-1');
    await protectedPageGuard();
    return <NoRagContainer />;
  } catch (error) {
    return redirect("/");
  }
}
