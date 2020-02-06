-- User Table

INSERT INTO public.user (email, username, password) VALUES ('thefloatingtree@gmail.com', 'thefloatingtree', 'oatmeal');

-- Folder Table

INSERT INTO public.folder (user_id, title) VALUES (
    (SELECT id FROM public.user WHERE email = 'thefloatingtree@gmail.com'),
    'ziggy'
);
INSERT INTO public.folder (user_id, title) VALUES (
    (SELECT id FROM public.user WHERE email = 'thefloatingtree@gmail.com'),
    'zaggy'
);
INSERT INTO public.folder (user_id, title) VALUES (
    (SELECT id FROM public.user WHERE email = 'thefloatingtree@gmail.com'),
    'twiggy'
);

-- Notes Table

INSERT INTO public.note (user_id, folder_id, title, creation, last_edited, data) VALUES (
    (SELECT id FROM public.user WHERE email = 'thefloatingtree@gmail.com'),
    1,
    'Test Note',
    NOW(),
    NOW(),
    '[]'
)