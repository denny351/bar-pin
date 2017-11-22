CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS pins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  type INTEGER,
  title VARCHAR(50),
  description TEXT,
  pin_date DATE
);
