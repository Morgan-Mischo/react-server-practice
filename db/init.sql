  CREATE TABLE "writers" (
	"writer_id" serial NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "writers_pk" PRIMARY KEY ("writer_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entries" (
	"entry_id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"writer_id" integer NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entry_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("writer_id") REFERENCES "writers"("writer_id");