"use client";

import { useUIState, useActions } from "ai/rsc";
import type { AI } from "@/getTextContent";

import { toast } from "sonner";
import { useCallback } from "react";
import { FileUploader } from "@/components/ui/uploader";
import { Content } from "@/components/content";

export default function Home() {
	const [response, setResponse] = useUIState<typeof AI>();
	const { getTextContent } = useActions<typeof AI>();

	const onUpload = useCallback(
		async (updatedFiles: File[]) => {
			const file = updatedFiles[0];

			const reader = new FileReader();
			reader.onload = async () => {
				const base64 = reader.result as string;

				// Submit and get response message
				toast.promise(getTextContent(base64), {
					success: (message) => {
						setResponse(message);
						return "Scanning text...";
					},
					error: (err) => {
						setResponse(null!);
						console.error(err);

						return `Failed to scan text, see console for more details`;
					},
				});
			};

			reader.readAsDataURL(file);
		},
		[getTextContent, setResponse]
	);

	return (
		<Content as="main" className="flex flex-col gap-y-4">
			<FileUploader maxSize={1024 * 1024 * 8} onUpload={onUpload} />
			{response && response.display}
		</Content>
	);
}
