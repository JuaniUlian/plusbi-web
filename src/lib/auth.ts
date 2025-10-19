import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { UserRole } from "@prisma/client"

// Extender tipos de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      guestExpiresAt?: Date | null
      premiumUntil?: Date | null
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    guestExpiresAt?: Date | null
    premiumUntil?: Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    guestExpiresAt?: Date | null
    premiumUntil?: Date | null
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Verificar si el usuario guest expiró
        if (user.role === "GUEST" && user.guestExpiresAt) {
          if (new Date() > user.guestExpiresAt) {
            throw new Error("GUEST_EXPIRED")
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          guestExpiresAt: user.guestExpiresAt,
          premiumUntil: user.premiumUntil,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.guestExpiresAt = user.guestExpiresAt
        token.premiumUntil = user.premiumUntil
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.guestExpiresAt = token.guestExpiresAt
        session.user.premiumUntil = token.premiumUntil
      }
      return session
    }
  },
  pages: {
    signIn: "/products/quest/login",
  },
  session: {
    strategy: "jwt",
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
