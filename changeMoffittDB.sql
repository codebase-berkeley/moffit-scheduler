psql postgres
drop database moffitt;
create database moffitt;
\q
psql moffitt < moffitt.sql

delete from availability;

-- insert the following avails into the availability table
-- e1 = {
--   id: 1,
--   tMoffitt3: true,
--   tMoffitt4: true,
--   tMain: true,
--   avails: [
--     { day: "sun", slot: 13 },
--     { day: "sun", slot: 13.5 },
--     { day: "sun", slot: 14 },
--     { day: "sun", slot: 14.5 },
--   ],
-- };

-- // Free from Sun 13-17
-- e2 = {
--   id: 2,
--   tMoffitt3: false,
--   tMoffitt4: true,
--   tMain: true,
--   avails: [
--     { day: "sun", slot: 13 },
--     { day: "sun", slot: 13.5 },
--     { day: "sun", slot: 14 },
--     { day: "sun", slot: 14.5 },
--     { day: "sun", slot: 15 },
--     { day: "sun", slot: 15.5 },
--     { day: "sun", slot: 16 },
--     { day: "sun", slot: 16.5 },
--   ],
-- };

INSERT INTO availability (
    availability_id,
    sle_id,
    start_time,
    day_of_week
)
VALUES
    (1, 1, 13, 0),
    (2, 1, 13.5, 0),
    (3, 1, 14, 0),
    (4, 1, 14.5, 0),
    (5, 2, 13, 0),
    (6, 2, 13.5, 0),
    (7, 2, 14, 0),
    (8, 2, 14.5, 0),
    (9, 2, 15, 0),
    (10, 2, 15.5, 0),
    (11, 2, 16, 0),
    (12, 2, 16.5, 0);
