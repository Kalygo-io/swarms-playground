"use server";

import { redirect } from "next/navigation";
import { protectedPageGuard } from "@/components/shared/utils/validate-token";
import { SpreadsheetContainer } from "./spreadsheet-container";
import { SpreadsheetSwarmProvider } from "@/context/spreadsheet-context";

export default async function Page() {
  try {
    // await protectedPageGuard();
    return (
      <SpreadsheetSwarmProvider>
        <SpreadsheetContainer />
      </SpreadsheetSwarmProvider>
    );
  } catch (error) {
    return redirect("/");
  }
}
