import { clearManagerSessionCookie, isSameOriginRequest } from "../../../../lib/admin-auth";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ error: "不正な送信元です。" }, { status: 403 });
  return new Response(null, {
    status: 303,
    headers: {
      "Cache-Control": "private, no-store",
      Location: "/",
      "Set-Cookie": clearManagerSessionCookie(),
    },
  });
}
