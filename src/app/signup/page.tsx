"use server";

import { redirect } from "next/navigation";
import { validateRequest } from "@/auth/validate-request";

import { Content } from "@/components/content";
import { Link } from "@/components/link";
import { SignupForm } from "@/app/signup/form";

export default async function Signup() {
	const { user } = await validateRequest();
	if (user) {
		redirect("/");
	}

	return (
		<Content as="main" className="h-[calc(100vh-12rem)] flex">
			<div className="space-y-8 self-center w-full">
				<div className="text-center">
					<h1 className="text-4xl font-bold">Create an account</h1>
					<p className="text-muted-foreground">
						Already have an account?{" "}
						<Link href="/signin" text="Sign in instead" />
					</p>
				</div>

				<SignupForm />
			</div>
		</Content>
	);
}
