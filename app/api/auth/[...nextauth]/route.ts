import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Export a handler function to NextAuth that will handle all requests
const handler = NextAuth(authConfig);

// Export GET and POST functions to handle authentication requests
export { handler as GET, handler as POST }; 