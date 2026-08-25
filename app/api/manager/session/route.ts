import { createManagerSessionCookie, isSameOriginRequest, verifyAdminPassword } from "../../../../lib/admin-auth";

function redirect(location: string, cookie?: string) {
  const headers = new Headers({ "Cache-Control": "private, no-store", Location: location });
  if (cookie) headers.set("Set-Cookie", cookie);
  return new Response(null, { status: 303, headers });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return Response.json({ error: "不正な送信元です。" }, { status: 403 });
  try {
    const form = await request.formData();
    const password = form.get("password");
    if (typeof password !== "string" || !(await verifyAdminPassword(password))) return redirect("/manager?error=invalid");
    const cookie = await createManagerSessionCookie();
    return cookie ? redirect("/manager", cookie) : redirect("/manager?error=setup");
  } catch {
    return redirect("/manager?error=invalid");
  }
}
