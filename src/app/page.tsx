import { redirect } from "next/navigation";
import { Uploader } from "@/app/uploader";

import { validateRequest } from "@/auth/validate-request";
import { Content } from "@/components/content";

export default async function Home() {
	const { user } = await validateRequest();
	if (!user) {
		redirect("/signin");
	}

	return (
		<Content as="main" className="flex flex-col gap-y-4">
			<Uploader />
		</Content>
	);
}
