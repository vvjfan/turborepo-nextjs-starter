import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";
import { hashPassword, verifyPassword } from "@repo/lib/auth/password";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: pool,
  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: "turbo-starter",
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: async ({ hash, password }) => verifyPassword(password, hash),
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => {
        console.log(`Sending OTP ${code} to ${phoneNumber}`);
      },
    }),
  ],
});
