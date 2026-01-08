import { auth } from "@/lib/auth"; // Import from your new auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
