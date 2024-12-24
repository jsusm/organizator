CREATE TABLE `categories_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`color` text DEFAULT 'gray' NOT NULL,
	`icon` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `operations_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`amount` integer NOT NULL,
	`category_id` integer,
	`description` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories_table`(`id`) ON UPDATE no action ON DELETE no action
);
