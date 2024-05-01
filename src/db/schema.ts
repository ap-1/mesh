import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
});

export type User = Omit<typeof users.$inferSelect, "hashedPassword">;

export const usersRelations = relations(users, ({ many }) => ({
	images: many(images),
}));

export const images = sqliteTable("image", {
	id: text("id").notNull().primaryKey(),
	text: text("text").notNull(),
	url: text("url").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
});

export type Image = typeof images.$inferSelect;

export const sessions = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	expiresAt: integer("expires_at").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users),
}));
