import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (!token) return false;
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/patients/:path*",
    "/doctors/:path*",
    "/reception/:path*",
    "/((?!signin|register|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
