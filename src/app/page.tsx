import { redirect } from "next/navigation";
import { Uploader } from "@/app/uploader";
import { Images } from "@/app/images";

import { validateRequest } from "@/auth/validate-request";
import { Content } from "@/components/content";

export default async function Home() {
	const { user } = await validateRequest();
	if (!user) {
		redirect("/login");
	}

	return (
		<Content as="main" className="flex flex-col gap-y-4">
			<Uploader />
			<Images user={user} />
		</Content>
	);
}
