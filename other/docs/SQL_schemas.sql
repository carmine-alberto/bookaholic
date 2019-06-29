CREATE TABLE "book" (
  "book_id" char(10) PRIMARY KEY,
  "title" text UNIQUE NOT NULL,
  "cover" varchar DEFAULT 'not_available.jpg',
  "abstract" text NOT NULL,
  "interview" text,
  "is_suggested" boolean DEFAULT false,
  "is_bestseller" boolean DEFAULT false,
  "publication_date" date NOT NULL,
  "genre" varchar,
  "language" varchar NOT NULL,
  "type" varchar
);

CREATE TABLE "book_details" (
  "book_id" char(10) REFERENCES "book"("book_id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  "cover_type" varchar,
  "price" float NOT NULL,
  "in_storage" int DEFAULT 2147483647
    CHECK ("in_storage" >= 0),
  "isbn" char(13) UNIQUE NOT NULL,
  PRIMARY KEY("book_id", "cover_type")
);

CREATE TABLE "user" (
  "username" varchar(20) PRIMARY KEY,
  "password_hash" char(60) NOT NULL,
  "email" text UNIQUE
);

CREATE TABLE "order" (
  "order_id" SERIAL PRIMARY KEY,
  "emission_time" timestamp(0) NOT NULL DEFAULT LOCALTIMESTAMP(0),
  "status" varchar(11) NOT NULL,
  "total" float NOT NULL,
  "address" text NOT NULL,
  "username" varchar(20) REFERENCES "user"("username")
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE "author" (
  "author_id" char(8) PRIMARY KEY,
  "name" text NOT NULL,
  "short_bio" text NOT NULL,
  "picture" varchar DEFAULT 'not_available.jpg'
);

CREATE TABLE "event" (
  "event_id" char(9) PRIMARY KEY,
  "title" text NOT NULL,
  "place" text NOT NULL,
  "occurring" timestamp(0) NOT NULL,
  "info" text,
  "image" varchar DEFAULT 'not_available.jpg',
  "book_id" char(10) REFERENCES "book"("book_id")
);

CREATE TABLE "cart" (
  "username" varchar(20) REFERENCES "user"("username")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  "book_id" char(10),
  "cover_type" varchar,
  "quantity" int NOT NULL,
  PRIMARY KEY ("username", "book_id", "cover_type"),
  FOREIGN KEY ("book_id", "cover_type") REFERENCES "book_details"("book_id", "cover_type")
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE "review" (
  "username" varchar(20) REFERENCES "user"("username")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  "book_id" char(10) REFERENCES "book"("book_id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  "gist" text DEFAULT 'Read below',
  "content" text NOT NULL,
  "rating" int NOT NULL
    CHECK("rating" >= 0 AND "rating" < 6),
  PRIMARY KEY("username", "book_id")
);

CREATE TABLE "order_details" (
  "order_id" int REFERENCES "order"("order_id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  "book_id" char(10),
  "cover_type" varchar,
  "item_price" float NOT NULL,
  "quantity" int NOT NULL,
  PRIMARY KEY ("order_id", "book_id", "cover_type"),
  FOREIGN KEY ("book_id", "cover_type") REFERENCES "book_details"("book_id", "cover_type")
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE "written_by" (
  "author_id" char(8) REFERENCES "author"("author_id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  "book_id" char(10) REFERENCES "book"("book_id")
    ON UPDATE CASCADE
    ON DELETE CASCADE,
   PRIMARY KEY ("author_id", "book_id")
);
