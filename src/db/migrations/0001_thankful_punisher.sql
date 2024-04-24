ALTER TABLE user ADD `username` text NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `hashed_password` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
ALTER TABLE `image` DROP COLUMN `created_at`;