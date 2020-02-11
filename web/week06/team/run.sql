DROP TABLE if EXISTS topic CASCADE;
DROP TABLE if EXISTS scripture CASCADE;
DROP TABLE if EXISTS linker CASCADE;
CREATE TABLE topic (
   topic_id    SERIAL      NOT NULL PRIMARY KEY,
   topic_name  VARCHAR(50) NOT NULL
);
CREATE TABLE scripture (
   scripture_id   SERIAL   NOT NULL PRIMARY KEY,
   book           TEXT     NOT NULL,
   chapter        INTEGER  NOT NULL,
   verse          INTEGER  NOT NULL,
   content        TEXT     NOT NULL
);
CREATE TABLE linker (
   linker_id      SERIAL   NOT NULL PRIMARY KEY,
   topic_id       INTEGER  NOT NULL REFERENCES topic(topic_id),
   scripture_id   INTEGER  NOT NULL REFERENCES scripture(scripture_id)
);
INSERT INTO topic (
   topic_name
) VALUES (
   'Faith'
);
INSERT INTO topic (
   topic_name
) VALUES (
   'Sacrafice'
);
INSERT INTO topic (
   topic_name
) VALUES (
   'Charity'
);