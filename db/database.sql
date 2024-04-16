create database pxldb;
\c pxldb

create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

-- insecureandlovinit
insert into users (user_name, password) values ('pxl-admin', '$2a$12$uTyp7b2T.5Z2ksKXPFnKSefZDKYx7351ozedapgoVrTXf.dzwKd8K') ;

-- iwishihadbetteradmins
insert into users (user_name, password) values ('george', '$2a$12$NydIbi0zQpHIBRlp1kdQ0ON8tjIPB9mAth5bHnuaLPd7l1ccTy2Ji') ;

COMMIT;