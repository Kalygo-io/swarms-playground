"use server";

import { redirect } from "next/navigation";
import { RearrangeContainer } from "@/app/dashboard/1-rearrange/rearrange-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { RearrangeSwarmProvider } from "@/context/rearrange-context";

export default async function Page() {
  try {
    // await protectedPageGuard();
    return (
      <RearrangeSwarmProvider>
        <RearrangeContainer />
      </RearrangeSwarmProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
