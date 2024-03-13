export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};

// this protect routs - don't let you go there if isn't login
