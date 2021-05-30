CREATE DATABASE digitalplanner;
\c digitalplanner;


DROP TABLE domain;
CREATE TABLE domain(
	ID SERIAL PRIMARY KEY     NOT NULL,
	NAME CHAR(50) NOT NULL,
	CATEGORY CHAR(50) NOT NULL,
	PHOTO_URL TEXT,
	DESCRIPTION TEXT
);


INSERT INTO domain (name, category, photo_url, description) 
VALUES 
(
	'facebook',
	'Cancer',
	'https://www.facebook.com/images/fb_icon_325x325.png',
	'This shit sucks your soul dry.'
);
