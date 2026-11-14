import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"

const client = new MongoClient("")
const db = client.db()
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
