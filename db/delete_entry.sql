DELETE FROM entries
WHERE id = $1; 

SELECT * FROM entries
WHERE writer_id = $2; 