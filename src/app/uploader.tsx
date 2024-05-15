"use client";

import { useUIState, useActions } from "ai/rsc";
import type { AI } from "@/lib/get-text-content";

import { toast } from "sonner";
import { useCallback } from "react";
import { FileUploader } from "@/components/ui/uploader";
import { usePasteImage } from "@/hooks/use-paste-image";

export const Uploader = () => {
	const [response, setResponse] = useUIState<typeof AI>();
	const { getTextContent } = useActions<typeof AI>();

	// Submit and get response message
	const handleImage = useCallback(
		(file: File) => {
			const reader = new FileReader();
			reader.onload = async () => {
				const base64 = reader.result as string;

				toast.promise(getTextContent(base64), {
					success: (message) => {
						setResponse(message);
						return "Scanning text...";
					},
					error: (err) => {
						setResponse(null!);
						console.error(err);

						return "Failed to scan text, see console for more details";
					},
				});
			};

			reader.readAsDataURL(file);
		},
		[getTextContent, setResponse]
	);

	usePasteImage(handleImage);

	const onUpload = async (updatedFiles: File[]) =>
		handleImage(updatedFiles[0]);

	return (
		<>
			<FileUploader maxSize={1024 * 1024 * 4} onUpload={onUpload} />
			{response?.display}
		</>
	);
};
