/*
Create schema for the project (replace `zoos` with your project)
*/
create schema if not exists zoos;
grant usage on schema zoos to anon, authenticated, service_role;
grant all on all tables in schema zoos to anon, authenticated, service_role;
grant all on all routines in schema zoos to anon, authenticated, service_role;
grant all on all sequences in schema zoos to anon, authenticated, service_role;
alter default privileges for role postgres in schema zoos grant all on tables to anon, authenticated, service_role;
alter default privileges for role postgres in schema zoos grant all on routines to anon, authenticated, service_role;
alter default privileges for role postgres in schema zoos grant all on sequences to anon, authenticated, service_role;
