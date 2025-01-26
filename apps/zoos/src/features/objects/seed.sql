/*
The seed is meant to give enough coverage to test different access rules.

In this case, I'm using these 2 accounts to test:
- art@zoohilldata.com => main account I'm testing as
- arterry1618@gmail.com => another account that will share access to some objects with main account

For your tests, replace art@zoohilldata.com and arterry1618@gmail.com with the emails
you're using to test.
*/
insert into zoos.objects (name, owner_email, object_type, object_data, update_email, access_read, access_write, access_manage) values 
    -- My object, no permissions
    ('Mine', 'art@zoohilldata.com', 'data', '{"key1": "value1"}', 'art@zoohilldata.com', array[]::text[], array[]::text[], array[]::text[]),
    ('Someones (read)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array['art@zoohilldata.com'], array[]::text[], array[]::text[]),
    ('Someones (read/write)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array[]::text[]),
    ('Someones (read/write/manage)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array['art@zoohilldata.com'], array['art@zoohilldata.com'], array['art@zoohilldata.com']),
    ('Someones (none)', 'arterry1618@gmail.com', 'data', '{"key1": "value1"}', 'arterry1618@gmail.com', array[]::text[], array[]::text[], array[]::text[])

;