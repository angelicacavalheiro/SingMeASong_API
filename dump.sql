CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" TEXT NOT NULL,
	"score" integer
) WITH (
  OIDS=FALSE
);




