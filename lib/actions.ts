"use server";

import { redirect } from "next/navigation";


export async function signInAction(callbackUrl?: string) {
  const finalCallbackUrl = callbackUrl && callbackUrl !== "/login" && callbackUrl !== "/"
    ? callbackUrl
    : "/";

  // Redirect to Better Auth's social sign-in route
  // The callbackURL param tells Better Auth where to go after success
  redirect(`/api/auth/sign-in/social?provider=google&callbackURL=${encodeURIComponent(finalCallbackUrl)}`);
}

export async function signOutAction() {
  // Better Auth signout is best handled client-side or by hitting the api endpoint
  // We can redirect to the signout API but it's a POST usually.
  // However, for server actions, we usually don't do this.
  // Putting a placeholder or removing if unused. 
  // But to be safe, we'll leave it empty/commented or redirect to home for now.
  redirect("/");
}
