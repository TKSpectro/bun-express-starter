CREATE TABLE `todos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`title` varchar(256) NOT NULL,
	`description` text,
	`completed` boolean NOT NULL DEFAULT false,
	`completed_at` timestamp,
	`priority` enum('low','medium','high') NOT NULL DEFAULT 'low',
	`fk_account` int NOT NULL,
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `todos` ADD CONSTRAINT `todos_fk_account_accounts_id_fk` FOREIGN KEY (`fk_account`) REFERENCES `accounts`(`id`) ON DELETE no action ON UPDATE no action;