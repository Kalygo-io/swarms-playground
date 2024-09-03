import { validateToken } from "@/services/validateToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function protectedPageGuard() {
  try {
    const cookieStore = cookies();
    const jwtCookie = cookieStore.get("jwt");

    if (!jwtCookie?.value) return redirect("/");
    await validateToken(jwtCookie?.value);
  } catch (error) {
    return redirect("/");
  }
}
