INSERT INTO writers(username, password)
VALUES($1, $2)
returning *; 