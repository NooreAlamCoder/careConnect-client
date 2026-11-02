import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://CareConnect:OpYlT7EDFzY2e9qa@cluster0.jbmfwwn.mongodb.net/?retryWrites=true&w=majority';
const dbName = process.env.DB_NAME || 'CareConnectDB';

const client = new MongoClient(uri);
const db = client.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || 'careconnect_better_auth_secret_key_2026_super_secure',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
});

