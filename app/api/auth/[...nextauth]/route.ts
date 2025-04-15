import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Export a handler function to NextAuth that will handle all requests
const handler = NextAuth(authOptions);

// Export GET and POST functions to handle authentication requests
export { handler as GET, handler as POST }; 