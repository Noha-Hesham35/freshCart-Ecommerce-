import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request:NextRequest)
{
const token = await getToken({req:request})
const pathName = request.nextUrl.pathname
if(token)
{
if(pathName=="/login" || pathName =="/register")
{
return NextResponse.redirect(new URL('/', request.url))
}
return NextResponse.next()
}

if(pathName=="/cart" || pathName=="/wishList")
{
return NextResponse.redirect(new URL('/login', request.url))
}

}

export const config = {
  matcher: ["/cart/:path*", "/wishList/:path*", "/login/:path*", "/register/:path*"],
}

