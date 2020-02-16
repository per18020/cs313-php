-- User Table

INSERT INTO public.user (email, username, password) VALUES ('per18020@byui.edu', 'per18020', 'oatmeal');

-- -- Folder Table

-- INSERT INTO public.folder (user_id, title) VALUES (
--     (SELECT id FROM public.user WHERE email = 'per18020@byui.edu'),
--     'ziggy'
-- );
-- INSERT INTO public.folder (user_id, title) VALUES (
--     (SELECT id FROM public.user WHERE email = 'per18020@byui.edu'),
--     'twiggy'
-- );
-- INSERT INTO public.folder (user_id, title) VALUES (
--     (SELECT id FROM public.user WHERE email = 'per18020@byui.edu'),
--     'twaggy'
-- );

-- -- Notes Table

-- INSERT INTO public.note (user_id, folder_id, title, creation, last_edited, data) VALUES (
--     (SELECT id FROM public.user WHERE email = 'per18020@byui.edu'),
--     (SELECT id FROM public.folder WHERE title = 'ziggy'),
--     'Test Note 1',
--     NOW(),
--     NOW(),
--     '{"ops":[{"insert":"Test Note 1"},{"attributes":{"header":1},"insert":"\n"},{"insert":"\n"}]}'
-- );

-- INSERT INTO public.note (user_id, folder_id, title, creation, last_edited, data) VALUES (
--     (SELECT id FROM public.user WHERE email = 'per18020@byui.edu'),
--     (SELECT id FROM public.folder WHERE title = 'ziggy'),
--     'Test Note 2',
--     NOW(),
--     NOW(),
--     '{"ops":[{"insert":"Test Note 2"},{"attributes":{"header":1},"insert":"\n"},{"insert":"\n"}]}'
-- );

-- INSERT INTO public.note (user_id, folder_id, title, creation, last_edited, data) VALUES (
--     (SELECT id FROM public.user WHERE email = 'per18020@byui.edu'),
--     (SELECT id FROM public.folder WHERE title = 'twiggy'),
--     'Test Note 3',
--     NOW(),
--     NOW(),
--     '{"ops":[{"insert":"Test Note 3"},{"attributes":{"header":1},"insert":"\n"},{"insert":"\n"}]}'
-- )