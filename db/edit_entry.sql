UPDATE entries
SET title = $2, content = $3
where entry_id = $1; 

SELECT * FROM entries
WHERE writer_id = $4; 