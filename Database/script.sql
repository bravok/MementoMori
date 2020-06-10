-- Database: MementoMori

-- DROP DATABASE "MementoMori";

CREATE DATABASE "MementoMori"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.calendar

-- DROP TABLE public.calendar;

CREATE TABLE public.calendar
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer,
    CONSTRAINT calendar_pkey PRIMARY KEY (id),
    CONSTRAINT "userId" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.calendar
    OWNER to postgres;
	
-- Table: public.calendar_field

-- DROP TABLE public.calendar_field;

CREATE TABLE public.calendar_field
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    text text COLLATE pg_catalog."default",
    rating integer,
    calendar_id integer NOT NULL,
    week_number integer,
    CONSTRAINT "CalendarField_pkey" PRIMARY KEY (id),
    CONSTRAINT "calendarField_calendar_id_fk_calendar_id" FOREIGN KEY (calendar_id)
        REFERENCES public.calendar (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.calendar_field
    OWNER to postgres;
	
-- Table: public.calendar_field

-- DROP TABLE public.calendar_field;

CREATE TABLE public.calendar_field
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    text text COLLATE pg_catalog."default",
    rating integer,
    calendar_id integer NOT NULL,
    week_number integer,
    CONSTRAINT "CalendarField_pkey" PRIMARY KEY (id),
    CONSTRAINT "calendarField_calendar_id_fk_calendar_id" FOREIGN KEY (calendar_id)
        REFERENCES public.calendar (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.calendar_field
    OWNER to postgres;
	
-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email character varying(254) COLLATE pg_catalog."default" NOT NULL,
    password character varying(60) COLLATE pg_catalog."default" NOT NULL,
    refreshtoken character varying COLLATE pg_catalog."default",
    birth_date date,
    first_name character varying COLLATE pg_catalog."default",
    second_name character varying COLLATE pg_catalog."default",
    years_to_live integer,
    register_date date,
    death_date date,
    weeks_to_live integer,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_unique UNIQUE (email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;