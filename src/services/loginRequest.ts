export async function loginRequest(email: string, password: string) {
  console.log("loginRequest...");

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API_URL}/api/auth/log-in`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    }
  );

  if (!resp.ok) {
    throw new Error("Authentication failed");
  }
}
