export async function registerAccount(email: string, password: string) {
  console.log('registerAccount...');
  await fetch(`${process.env.NEXT_PUBLIC_NODE_API_URL}/api/v1/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}