import React from 'react'

export async function logoutRequest() {
  console.log('logoutRequest...');

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}