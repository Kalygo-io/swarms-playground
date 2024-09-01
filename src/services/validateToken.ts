export async function validateToken(token: string) {
  console.log("--- validateToken ---");
  console.log(`${process.env.NEXT_PUBLIC_NODE_API_URL}`);

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_NODE_API_URL}/api/v1/auth/is-authed`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!resp.ok) {
    throw new Error("Failed to validate token");
  }
}