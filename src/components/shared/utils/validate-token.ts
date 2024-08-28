import { validateToken } from "@/services/validateToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function protectedPageGuard() {
  try {
    console.log();
    console.log("protectedPageGuard");
    console.log();

    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");

    // console.log(jwtCookie);

    if (!jwtCookie?.value) return redirect("/");

    await validateToken(jwtCookie?.value);
    debugger
  } catch (error) {
    return redirect("/");
  }
}
