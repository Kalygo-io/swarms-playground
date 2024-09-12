"use server";

import { redirect } from "next/navigation";
import { SwarmDesignerContainer } from "@/app/dashboard/design-and-run/swarm-designer-container";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { SwarmDesignerProvider } from "@/context/swarm-designer-context";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <SwarmDesignerProvider>
        <DashboardLayout>
          <SwarmDesignerContainer />
        </DashboardLayout>
      </SwarmDesignerProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
