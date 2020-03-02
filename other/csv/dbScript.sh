\copy book FROM book.csv DELIMITER '|' CSV HEADER;
\copy book_details FROM book_details.csv DELIMITER '|' CSV HEADER;
\copy author FROM author.csv DELIMITER '|' CSV HEADER;
\copy written_by FROM written_by.csv DELIMITER '|' CSV HEADER;
\copy event FROM event.csv DELIMITER '|' CSV HEADER;
\copy review FROM review.csv DELIMITER '|' CSV HEADER;
