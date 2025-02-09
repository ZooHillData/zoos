/*
-- Reset:

--------
-- types
--------
drop type if exists zoos.objects_user_type_enum cascade;

---------
-- tables
---------
drop table if exists zoos.objects_folders cascade;
drop table if exists zoos.objects cascade;
drop table if exists zoos.objects_users cascade;
drop table if exists zoos.objects_groups cascade;
drop table if exists zoos.objects_history cascade;
*/
create type zoos.objects_user_type_enum as enum ('user', 'admin');

create table if not exists zoos.objects_folders (
    id bigint generated by default as identity not null primary key,
    path text not null unique,
    description text null,
    metadata jsonb default '{}'::jsonb not null,
    owner_email text not null,
    created_at timestamp with time zone default now() not null,
    last_updated_at timestamp with time zone default now() not null,
    last_updated_email text not null,
    access_read_emails text[] default array[]::text[] not null,
    access_write_emails text[] default array[]::text[] not null,
    access_manage_emails text[] default array[]::text[] not null,
    access_read_group_ids bigint[] default array[]::bigint[] not null,
    access_write_group_ids bigint[] default array[]::bigint[] not null,
    access_manage_group_ids bigint[] default array[]::bigint[] not null
);
alter table zoos.objects_folders enable row level security;

-- row level security
drop policy if exists "select" on zoos.objects_folders;
create policy "select" on zoos.objects_folders for select using (auth.email() = owner_email or auth.email() = any(access_read_emails));

drop policy if exists "insert" on zoos.objects_folders;
create policy "insert" on zoos.objects_folders for insert with check (auth.email() = owner_email);

drop policy if exists "update" on zoos.objects_folders;
create policy "update" on zoos.objects_folders for update using (auth.email() = owner_email or auth.email() = any(access_write_emails));

drop policy if exists "delete" on zoos.objects_folders;
create policy "delete" on zoos.objects_folders for delete using (auth.email() = owner_email or auth.email() = any(access_manage_emails));



/*
start: zoos.objects
*/

-- table
create table if not exists zoos.objects (
    id bigint generated by default as identity not null primary key,
    folder_id bigint null references zoos.objects_folders(id) on delete set null,
    name text not null default 'Untitled',
    description text not null default '',
    object_type text not null,
    object_data jsonb not null,
    metadata jsonb default '{}'::jsonb not null,
    owner_email text not null,
    created_at timestamp with time zone default now() not null,
    last_updated_at timestamp with time zone default now() not null,
    last_updated_email text not null,
    access_read_emails text[] default array[]::text[] not null,
    access_write_emails text[] default array[]::text[] not null,
    access_manage_emails text[] default array[]::text[] not null,
    access_read_group_ids bigint[] default array[]::bigint[] not null,
    access_write_group_ids bigint[] default array[]::bigint[] not null,
    access_manage_group_ids bigint[] default array[]::bigint[] not null,
    unique (name, folder_id)
);

-- Save Object History trigger: 
-- ! comment out if you do not want to store object history 
create or replace function zoos.objects_history_trigger()
returns trigger as $$
begin
    insert into zoos.objects_history (
        id, updated_at, update_email, object_data, metadata
    ) values (
        new.id, now(), new.last_updated_email, new.object_data, new.metadata
    );
    
    return new;
end;
-- Need security definer to allow insert (objects_history RLS disallows insert)
$$ language plpgsql security definer;  
create or replace trigger objects_history_trigger
after update on zoos.objects
for each row
execute function zoos.objects_history_trigger();


-- row level security
alter table zoos.objects enable row level security;

drop policy if exists "select" on zoos.objects;
create policy "select" on zoos.objects for select using (auth.email() = owner_email or auth.email() = any(access_read_emails));

drop policy if exists "insert" on zoos.objects;
create policy "insert" on zoos.objects for insert with check (auth.email() = owner_email);

drop policy if exists "update" on zoos.objects;
create policy "update" on zoos.objects for update using (auth.email() = owner_email or auth.email() = any(access_write_emails));

drop policy if exists "delete" on zoos.objects;
create policy "delete" on zoos.objects for delete using (auth.email() = owner_email or auth.email() = any(access_manage_emails));

/*
end: zoos.objects
*/


/*
start: zoos.objects_users
*/

create table if not exists zoos.objects_users (
    email text not null primary key,
    user_type zoos.objects_user_type_enum not null
);
alter table zoos.objects_users enable row level security;
drop policy if exists "select" on zoos.objects_users;
create policy "select" on zoos.objects_users for select using (auth.role() = 'authenticated');

/*
end: zoos.objects_users
*/

/*
start: zoos.objects_groups
*/

create table if not exists zoos.objects_groups (
    id bigint generated by default as identity not null primary key,
    name text not null unique,
    description text null
);
alter table zoos.objects_groups enable row level security;

/*
end: zoos.objects_groups
*/

/*
start: zoos.objects_history
*/

create table if not exists zoos.objects_history (
    id bigint references zoos.objects(id) on delete cascade,
    -- id bigint not null,
    updated_at timestamp with time zone default now() not null,
    update_email text not null,
    object_data jsonb not null,
    metadata jsonb not null,
    tag text null
);
alter table zoos.objects_history enable row level security;
drop policy if exists "select" on zoos.objects_history;
create policy "select" on zoos.objects_history for select using ( 
    exists ( 
        select 1 from zoos.objects where id = id
    )
);

/*
end: zoos.objects_history
*/

create or replace view zoos.objects_view 
with (security_invoker = true) as 
select
    objects.*,
    folders.path as folder_path,
    folders.owner_email as folder_owner_email
from
    zoos.objects objects 
left join
    zoos.objects_folders folders
on 
    objects.folder_id = folders.id
;