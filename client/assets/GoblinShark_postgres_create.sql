CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"user_name" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"description" varchar(255),
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "clubs" (
	"club_id" serial NOT NULL,
	"club_name" varchar(80) NOT NULL,
	"description" varchar(300) NOT NULL,
	CONSTRAINT "clubs_pk" PRIMARY KEY ("club_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "members" (
	"member_id" serial NOT NULL,
	"user_id" int NOT NULL,
	"club_id" int NOT NULL,
	"admin" BOOLEAN NOT NULL DEFAULT 'false',
	"voted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "members_pk" PRIMARY KEY ("member_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "books" (
	"book_id" serial NOT NULL,
	"club_id" int NOT NULL,
	"google_book_id" varchar(255) NOT NULL,
	"currently_reading" BOOLEAN NOT NULL DEFAULT 'false',
	"to_read" BOOLEAN NOT NULL,
	"book_votes" int NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("book_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"question_id" serial NOT NULL,
	"question" varchar(255) NOT NULL,
	"member_id" int NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY ("question_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "messages" (
	"message_id" serial NOT NULL,
	"message" varchar(255) NOT NULL,
	"member_id" int NOT NULL,
  "edited" BOOLEAN NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "messages_pk" PRIMARY KEY ("message_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "members" ADD CONSTRAINT "members_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "members" ADD CONSTRAINT "members_fk1" FOREIGN KEY ("club_id") REFERENCES "clubs"("club_id");

ALTER TABLE "books" ADD CONSTRAINT "books_fk0" FOREIGN KEY ("club_id") REFERENCES "clubs"("club_id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("member_id") REFERENCES "members"("member_id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("member_id") REFERENCES "members"("member_id");






