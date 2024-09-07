"use server";

import { validateToken } from "@/services/validateToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function protectedPageGuard() {
  try {
    console.log("protectedPageGuard");

    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");

    if (!jwtCookie?.value) return redirect("/");

    console.log("calling validateToken()");

    await validateToken(jwtCookie?.value);
  } catch (error) {
    return redirect("/");
  }
}
