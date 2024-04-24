import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { sessions, users, images } from "@/db/schema";
import { env } from "@/env";
import { eq } from "drizzle-orm";

const client = createClient({
	url: env.TURSO_CONNECTION_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { logger: true });

export const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const createUser = (user: typeof users.$inferInsert) => {
	db.insert(users).values(user).all();
};

export const getUserByUsername = (username: string) => {
	return db.select().from(users).where(eq(users.username, username)).limit(1);
};

export const createImage = (image: typeof images.$inferInsert) => {
	db.insert(images).values(image).all();
};
