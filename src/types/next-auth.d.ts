import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  type UserType = {
    name?: string
    email?: string
    role?: string
    user?: {
      name?: string
      email?: string
      role?: string
    }
  }

  interface User {
    user: UserType
    token: string
  }

  interface Session {
    user: UserType
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string
  }
}