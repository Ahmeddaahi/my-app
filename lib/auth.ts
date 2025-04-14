import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

export const auth = async () => {
  return getServerSession(authConfig);
}; 