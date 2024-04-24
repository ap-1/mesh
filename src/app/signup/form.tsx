"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { action } from "@/app/signup/action";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const schema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(31, { message: "Username may not be longer than 31 characters" })
		.regex(/^[a-z0-9_-]+$/, {
			message:
				"Username must only consist of lowercase letters, 0-9, -, and _",
		}),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.max(64, {
			message: "Password may not be longer than 64 characters",
		}),
});

export type Schema = z.infer<typeof schema>;

export const SignupForm = () => {
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (values: Schema) => {
		action(values)
			.then((response) => {
				if (response && response.error) {
					return toast.error(response.error);
				} else {
					toast.success("Account created successfully");
				}
			})
			.catch((err) => toast.error(err.message));
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 max-w-2xl mx-auto"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username here"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password here"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Sign up
				</Button>
			</form>
		</Form>
	);
};
