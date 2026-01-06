"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInAction(callbackUrl?: string) {
  // Always redirect to "/" unless callbackUrl is explicitly a protected page
  let redirectTo = "/";

  if (callbackUrl && callbackUrl !== "/login" && callbackUrl !== "/") {
    redirectTo = callbackUrl;
  }

  await signIn("google", {
    redirectTo: redirectTo,
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
