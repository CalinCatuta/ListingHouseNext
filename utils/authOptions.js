import connectDB from "@/config/database";
import User from "@/models/User";

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
      await connectDB();
      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // if not, then add user to db
      if (!userExists) {
        // truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // Return true to allow sing in
      return true;
    },
    // modifies the session object
    async session({ session }) {
      // get user
      const user = await User.findOne({ email: session.user.email });
      // assign the user id to the session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
