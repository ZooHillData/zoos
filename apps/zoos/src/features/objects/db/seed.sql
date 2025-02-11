/*
The seed is meant to give enough coverage to test different access rules.

In this case, I'm using these 2 accounts to test:
- art@zoohilldata.com => main account I'm testing as
- arterry1618@gmail.com => another account that will share access to some objects with main account

For your tests, replace art@zoohilldata.com and arterry1618@gmail.com with the emails
you're using to test.
*/

insert into zoos.objects_folders (path, owner_email, last_updated_email, access_read_emails, access_write_emails, access_manage_emails) values
    -- ('/writing', 'art@zoohilldata.com', 'art@zoohilldata.com'),
    -- ('/drawing', 'art@zoohilldata.com', 'art@zoohilldata.com'),
    -- ('/data', 'art@zoohilldata.com', 'art@zoohilldata.com'),
    -- ('/data/more-data', 'art@zoohilldata.com', 'art@zoohilldata.com'),
    ('/group1', 'borst@zoohilldata.com', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com']::text[], array['art@zoohilldata.com']::text[]),
    ('/group2', 'borst@zoohilldata.com', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com']::text[], array['art@zoohilldata.com']::text[])
;

insert into zoos.objects (name, owner_email, object_type, object_data, last_updated_email, access_read_emails, access_write_emails, access_manage_emails, folder_id) values 
    -- My object, no permissions
    -- ('Mine', 'art@zoohilldata.com', 'data', '{"key1": "value1"}', 'art@zoohilldata.com', array[]::text[], array[]::text[], array[]::text[], 1),
    -- ('Someones (read)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array['art@zoohilldata.com'], array[]::text[], array[]::text[], 2),
    -- ('Someones (read, write)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array[]::text[], 2),
    -- ('Someones (read, write, manage)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 3),
    -- ('Someones (none)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array[]::text[], array[]::text[], array[]::text[], 4),
    ('View1', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 1),
    ('View2', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 1),
    ('View3', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 1),
    ('View4', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 1),
    ('View5', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 2),
    ('View6', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 2),
    ('View7', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 2),
    ('View8', 'borst@zoohilldata.com', 'tableState', '{"columnVisibility": {"submission_id": false}}', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 2),
    ('Group1', 'borst@zoohilldata.com', 'viewGroup', '[1,2,3,4,5,6,7,8]', 'borst@zoohilldata.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com'], 1),
;

insert into zoos.objects_users (email, user_type) values
    ('art@zoohilldata.com', 'admin'),
    ('arterry1618@gmail.com', 'user'),
    ('bk@zoohilldata.com', 'user'),
    ('borst@zoohilldata.com', 'user'),
    ('bryce@zoohilldata.com', 'user')
;


