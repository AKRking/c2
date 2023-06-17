import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params: any) {
      const userInfo = await createOrUpdateUser(params.profile);
      if (!userInfo) return false;
      params.user._id = userInfo._id;
      params.user.admin = userInfo.admin;
      return true;
    },
    jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session(params: any) {
      params.session.user._id = params.token.user._id;
      params.session.user.admin = params.token.user.admin || false;
      return params.session;
    },
  },
};

const createOrUpdateUser = async (profile: any) => {
  try {
    let user = await User.findOne({ user_id: profile.id });
    if (
      user &&
      (user.name !== profile.name ||
        user.email !== profile.email ||
        user.image !== profile.picture.data.url)
    ) {
      user.name = profile.name;
      user.email = profile.email;
      user.image = profile.picture.data.url;
      await user.save();
    } else {
      user = await new User({
        user_id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture.data.url,
      }).save();
    }
    return user;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
