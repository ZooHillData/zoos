/*
-- Reset:

--------
-- types
--------
drop type if exists zoos.objects_user_type_enum cascade;

---------
-- tables
---------
drop table if exists zoos.objects_folder;
drop table if exists zoos.objects cascade;
drop table if exists zoos.objects_users;
drop table if exists zoos.objects_groups;
drop table if exists zoos.objects_history;
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

/*
start: zoos.objects
*/

-- table
create table if not exists zoos.objects (
    id bigint generated by default as identity not null primary key,
    folder_id bigint null references zoos.objects_folders(id) on delete set null,
    name text not null,
    description text null,
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


create table if not exists zoos.objects_users (
    email text not null primary key,
    user_type zoos.objects_user_type_enum not null
);
alter table zoos.objects_users enable row level security;
drop policy if exists "select" on zoos.objects_users;
create policy "select" on zoos.objects_users for select using (auth.role() = 'authenticated');

create table if not exists zoos.objects_groups (
    id bigint generated by default as identity not null primary key,
    name text not null unique,
    description text null
);
alter table zoos.objects_groups enable row level security;

create table if not exists zoos.objects_history (
    id bigint references zoos.objects(id) not null,
    updated_at timestamp with time zone default now() not null,
    update_email text not null,
    object_data jsonb not null,
    metadata jsonb not null
);
alter table zoos.objects_history enable row level security;