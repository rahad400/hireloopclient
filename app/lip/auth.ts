import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_CIENT as string)
const db = client.db("hire-client")
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  user:{
    additionalFields:{
      role:{
        type:['candidate|employer|admin'],
        input:true,
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  
})
