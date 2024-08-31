import { requireAuth } from "@clerk/clerk-sdk-node";


const clerk = new requireAuth({
  apiKey: process.env.CLERK_SECRET_KEY,
});

export default clerk