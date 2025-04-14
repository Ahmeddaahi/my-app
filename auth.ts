"use client";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from "next-auth/react";

export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
export { useSession };

export type { Session } from "next-auth"; 