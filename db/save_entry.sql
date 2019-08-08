INSERT INTO entries(title, content, writer_id)
VALUES ($1, $2, $3); 

SELECT * FROM entries
WHERE writer_id = $3; 
