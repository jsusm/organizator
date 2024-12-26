PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_operations_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`amount` integer NOT NULL,
	`category_id` integer,
	`description` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories_table`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_operations_table`("id", "date", "amount", "category_id", "description") SELECT "id", "date", "amount", "category_id", "description" FROM `operations_table`;--> statement-breakpoint
DROP TABLE `operations_table`;--> statement-breakpoint
ALTER TABLE `__new_operations_table` RENAME TO `operations_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;