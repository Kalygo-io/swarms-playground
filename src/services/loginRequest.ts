export async function loginRequest(email: string, password: string) {
  console.log('loginRequest...');

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/log-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });
}