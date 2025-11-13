import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  // Ejemplo: redirigir si no hay sesión
  if (!req.cookies.get("next-auth.session-token")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  //matcher: ["/dashboard/:path*", "/perfil/:path*"],
  matcher: ['/dash/:path*', '/lesson/:path*'],
};






