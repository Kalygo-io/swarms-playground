"use server";

import { redirect } from "next/navigation";
import { SequentialContainer } from "./sequential-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    
    console.log('experiment-1');
    await protectedPageGuard();
    return <SequentialContainer />;
  } catch (error) {
    return redirect("/");
  }
}
