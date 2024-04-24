import { Lucia } from "lucia";
import { adapter } from "@/db/adapter";
import type { User } from "@/db/schema";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// set cookies with a super long expiration because they cannot be extended
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			username: attributes.username,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: User;
	}
}
