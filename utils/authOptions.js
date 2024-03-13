import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoce on successful signin
    async signIn({ profile }) {
      // Connect to database
      // Check if user exists
      // if not, then add user to db
      // Return true to allow sing in
    },
    // modifies the session object
    async session({ session }) {
      // get user
      // assign the user id to the session
      // return session
    },
  },
};
