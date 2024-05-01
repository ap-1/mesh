import Image from "next/image";
import { redirect } from "next/navigation";
import { useMemo } from "react";

import { deleteImage, getImagesByUserId } from "@/db/adapter";
import type { Image as ImageType, User } from "@/db/schema";
import { apply } from "@/lib/bionic-reading";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TrashIcon } from "@radix-ui/react-icons";

interface CardProps {
	image: ImageType;
}

const Card = ({ image }: CardProps) => {
	const callback = async () => {
		"use server";
		deleteImage(image.id);
		redirect("/");
	};

	const text = useMemo(() => apply(image.text), [image]);

	return (
		<Collapsible className="relative group rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
			<CollapsibleTrigger className="w-full block relative data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg overflow-hidden">
				<Image
					src={image.url}
					alt={image.text}
					width={600}
					height={400}
					className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-secondary/80 to-transparent">
					<p className="text-primary/80 text-sm line-clamp-2 text-start">
						{text}
					</p>
				</div>
			</CollapsibleTrigger>

			<form action={callback} className="absolute top-0 right-0 mr-2 mt-2">
				<Button variant="destructive" size="icon" type="submit">
					<TrashIcon className="size-4" />
				</Button>
			</form>

			<CollapsibleContent className="rounded-b-lg bg-secondary text-secondary-foreground p-4">
				{text}
			</CollapsibleContent>
		</Collapsible >
	);
}

interface ImagesProps {
	user: User;
}

export const Images = async ({ user }: ImagesProps) => {
	const images = await getImagesByUserId(user.id);

	return (
		<div className="pt-4 pb-8 flex flex-col gap-y-4">
			{images.map((image) => (
				<Card key={image.id} image={image} />
			))}
		</div>
	);
}
