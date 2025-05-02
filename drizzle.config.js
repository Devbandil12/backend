import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://neon_owner:npg_PBUuic1Nqh6s@ep-restless-truth-a1lw60hg-pooler.ap-southeast-1.aws.neon.tech/neon?sslmode=require"
  },
});
