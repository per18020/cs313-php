CREATE TABLE public.user
(
	id serial PRIMARY KEY,
	email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
	last_edited_note integer NOT NULL
);

CREATE TABLE public.note 
(
	id serial PRIMARY KEY,
	user_id integer NOT NULL,
	folder_id integer,
	title varchar(255) NOT NULL,
	creation timestamp NOT NULL,
	last_edited timestamp NOT NULL,
	data jsonb NOT NULL
);

CREATE TABLE public.folder 
(
	id serial PRIMARY KEY,
	user_id integer NOT NULL,
	parent_id integer,
	title varchar(255) NOT NULL
);

ALTER TABLE public.user ADD CONSTRAINT user_fk0 FOREIGN KEY (last_edited_note) REFERENCES public.note(id);

ALTER TABLE public.note ADD CONSTRAINT note_fk0 FOREIGN KEY (user_id) REFERENCES public.user(id);
ALTER TABLE public.note ADD CONSTRAINT note_fk1 FOREIGN KEY (folder_id) REFERENCES public.folder(id);

ALTER TABLE public.folder ADD CONSTRAINT folder_fk0 FOREIGN KEY (user_id) REFERENCES public.user(id);
ALTER TABLE public.folder ADD CONSTRAINT folder_fk1 FOREIGN KEY (parent_id) REFERENCES public.folder(id);