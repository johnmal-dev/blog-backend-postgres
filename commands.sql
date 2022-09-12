CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER
);

INSERT INTO blogs (url, title) VALUES ('https://www.macrumors.com/', 'MacRumors');

INSERT INTO blogs (url, title) VALUES ('https://mashable.com/', 'Mashable');

