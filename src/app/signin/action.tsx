"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import bcrypt from "bcryptjs";
import { getUserByUsername } from "@/db/adapter";
import { lucia } from "@/auth";

import type { Schema } from "@/app/signin/form";

interface ActionResult {
	error: string;
}

export async function action(values: Schema): Promise<ActionResult> {
	const existingUsers = await getUserByUsername(values.username);

	if (existingUsers.length === 0) {
		return {
			error: "Invalid username or password",
		};
	}

	const existingUser = existingUsers[0];

	// Potentially don't use bcrypt.compare() because we want to always hash the password
	// Attackers would otherwise use the timing to determine whether a user exists
	if (!(await bcrypt.compare(values.password, existingUser.hashedPassword))) {
		return {
			error: "Invalid username or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/");
}
