import React from "react";

export async function logoutRequest() {
  console.log("logoutRequest...");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/log-out`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!resp.ok) {
    throw new Error("An error occurred");
  }
}
