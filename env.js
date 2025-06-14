import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // NODE_ENV: z
    //   .enum(["development", "test", "production"])
    //   .default("development"),
  },
  client: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY: z.string().optional(),
    NEXT_PUBLIC_EMAIL_JS_TEMPLATE_KEY: z.string().optional(),
    NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY: z.string().optional(),
    NEXT_PUBLIC_API_URL_NUBA: z.string().optional(),
    NEXT_PUBLIC_RYFT_PUBLIC_KEY: z.string().optional()
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL_NUBA: process.env.NEXT_PUBLIC_API_URL_NUBA,
    NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY:
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_EMAIL_JS_TEMPLATE_KEY:
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_KEY,
    NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
      NEXT_PUBLIC_RYFT_PUBLIC_KEY:process.env.NEXT_PUBLIC_RYFT_PUBLIC_KEY
  },
});
