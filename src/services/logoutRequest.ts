import React from "react";

export async function logoutRequest() {
  console.log("logoutRequest...");

  await fetch(`${process.env.NEXT_PUBLIC_NODE_API_URL}/api/auth/log-out`, {
    method: "DELETE",
    credentials: "include",
  });
}
