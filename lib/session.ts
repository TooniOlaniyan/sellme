import { getServerSession } from "next-auth/next";
import { User, NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonWebToken from "jsonwebtoken";
import Jwt from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/coomon.types";
import { createUser, getUser } from "./actions";

export async function getCurretUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // jwt : {
  //     encode: ({secret , token}) => {

  //     },
  //     decode : async ({secret , token}) => {

  //     }
  // },

  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },

  callbacks: {
    async session({ session }) {

        const email = session?.user?.email as string
        try {
            const data = await getUser(email) as {user? : UserProfile}
            const newSession = {
                ...session,
                user:{
                    ...session.user,
                    ...data?.user
                }
            }
            return newSession
        } catch (error) {
            console.log('Error retriving user data' , error)
            
            return session;
        }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExist = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExist) {
          createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        return true;

      } catch (error) {
        // something went wrong
        return false;
      }
    },
  },
};
