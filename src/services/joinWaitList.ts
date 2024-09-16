export async function joinWaitList(email: string) {
  console.log("joinWaitList...");
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/waitlist/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );

  if (!resp.ok) {
    throw new Error("An error occurred");
  }
}
