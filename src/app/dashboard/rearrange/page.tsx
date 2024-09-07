"use server";

import { redirect } from "next/navigation";
import { RearrangeContainer } from "@/app/dashboard/rearrange/rearrange-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { RearrangeSwarmProvider } from "@/context/rearrange-context";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    console.log("rearrange Page.tsx");

    await protectedPageGuard();
    return (
      <RearrangeSwarmProvider>
        <DashboardLayout>
          <RearrangeContainer />
        </DashboardLayout>
      </RearrangeSwarmProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
