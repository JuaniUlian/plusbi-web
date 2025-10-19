export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: [
    '/products/quest/dashboard/:path*',
    '/products/quest/informe/:path*',
  ],
}
