"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { SpreadsheetContainer } from "./spreadsheet-container";
import { SpreadsheetSwarmProvider } from "@/context/spreadsheet-context";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default async function Page() {
  try {
    await protectedPageGuard();
    return (
      <SpreadsheetSwarmProvider>
        <DashboardLayout>
          <SpreadsheetContainer />
        </DashboardLayout>
      </SpreadsheetSwarmProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
