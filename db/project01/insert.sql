-- User Table

INSERT INTO public.user (email, password) VALUES ('thefloatingtree@gmail.com', 'oatmeal');

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