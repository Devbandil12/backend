import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import dotenv from "dotenv"
dotenv.config()

export const sql = neon(process.env.DB_URL);
export const db = drizzle({ client: sql });

