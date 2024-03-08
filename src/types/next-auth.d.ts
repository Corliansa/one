import { type DefaultUser, type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      role: "ADMIN" | "USER";
      status: "ACTIVE" | "INACTIVE";
      verification: "VERIFIED" | "UNVERIFIED";
      occupation: string;
      updated: boolean;
      universityName: string;
      universityEmail: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role: "ADMIN" | "USER";
    status: "ACTIVE" | "INACTIVE";
    verification: "VERIFIED" | "UNVERIFIED";
    occupation: string;
    updated: boolean;
    universityName: string;
    universityEmail: string;
  }
}
