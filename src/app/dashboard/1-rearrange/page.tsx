"use server";

import { redirect } from "next/navigation";
import { RearrangeContainer } from "./rearrange-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";

export default async function Page() {
  try {
    
    console.log('experiment-1');
    await protectedPageGuard();
    return <RearrangeContainer />;
  } catch (error) {
    return redirect("/");
  }
}
