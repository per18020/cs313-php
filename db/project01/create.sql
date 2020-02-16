CREATE TABLE public.user
(
	id serial PRIMARY KEY,
	email varchar(255) UNIQUE NOT NULL,
	username varchar(25) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE public.note 
(
	id serial PRIMARY KEY,
	user_id integer NOT NULL,
	folder_id integer,
	title varchar(255) NOT NULL,
	creation varchar(255) NOT NULL,
	last_edited varchar(255) NOT NULL,
	data text NOT NULL
);

CREATE TABLE public.folder 
(
	id serial PRIMARY KEY,
	user_id integer NOT NULL,
	title varchar(255) NOT NULL
);

ALTER TABLE public.note ADD CONSTRAINT note_fk0 FOREIGN KEY (user_id) REFERENCES public.user(id);
ALTER TABLE public.note ADD CONSTRAINT note_fk1 FOREIGN KEY (folder_id) REFERENCES public.folder(id);

ALTER TABLE public.folder ADD CONSTRAINT folder_fk0 FOREIGN KEY (user_id) REFERENCES public.user(id);