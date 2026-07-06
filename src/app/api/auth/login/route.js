export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ message: "Missing fields" }, { status: 400 });
  }

  return Response.json({
    token: "login-token-123",
  });
}