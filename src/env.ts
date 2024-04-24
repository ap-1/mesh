import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		OPENAI_API_KEY: z.string().min(1),
		TURSO_CONNECTION_URL: z.string().url(),
		TURSO_AUTH_TOKEN: z.string().min(1),
	},
	runtimeEnv: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
		TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
	},
});
