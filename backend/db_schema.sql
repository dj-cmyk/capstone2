

-- CREATE TABLE "teachers" (
--     "teacherID" int   NOT NULL,
--     "username" string   NOT NULL,
--     "first_name" string   NOT NULL,
--     "last_name" string   NOT NULL,
--     "email" string   NOT NULL,
--     "password" string   NOT NULL,
--     CONSTRAINT "pk_teachers" PRIMARY KEY (
--         "teacherID"
--      ),
--     CONSTRAINT "uc_teachers_username" UNIQUE (
--         "username"
--     )
-- );

CREATE TABLE "exercise_categories" (
    "exerciseCategoryID" SERIAL PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE "level_categories" (
    "levelCategoryID" SERIAL PRIMARY KEY,
    "name" text NOT NULL
);

CREATE TABLE "levels" (
    "levelID" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "levelCategoryId" int NOT NULL
);

CREATE TABLE "exercises" (
    "exerciseID" SERIAL NOT NULL,
    "levelCategoryID" int   NOT NULL,
    "exerciseCategoryID" int   NOT NULL,
    "description" text   NOT NULL,
    "hasProp" boolean   NOT NULL,
    "propDescription" text,
    CONSTRAINT "pk_exercises" PRIMARY KEY (
        "exerciseID"
     )
);

CREATE TABLE "class_exercises" (
    "lessonPlanID" int   NOT NULL,
    "exerciseID" int   NOT NULL, 
    "notes" text
);

CREATE TABLE "lesson_plans" (
    "lessonPlanID" SERIAL NOT NULL,
    "order" int   NOT NULL,
    "theme" text,
    "focus" text,
    "levelID" int   NOT NULL,
    CONSTRAINT "pk_lesson_plans" PRIMARY KEY (
        "lessonPlanID"
     )
);

-- this must populate from API so maybe it should just be a link?
-- CREATE TABLE "songs" (
--     "songID" int   NOT NULL,
--     "name" string   NOT NULL,
--     "artist" string   NOT NULL,
--     "album" string   NOT NULL,
--     CONSTRAINT "pk_songs" PRIMARY KEY (
--         "songID"
--      )
-- );

ALTER TABLE "levels" ADD CONSTRAINT "fk_levels_levelCategoryId" FOREIGN KEY("levelCategoryId")
REFERENCES "level_categories" ("levelCategoryID");

ALTER TABLE "exercises" ADD CONSTRAINT "fk_exercises_levelCategoryID" FOREIGN KEY("levelCategoryID")
REFERENCES "level_categories" ("levelCategoryID");

ALTER TABLE "exercises" ADD CONSTRAINT "fk_exercises_exerciseCategoryID" FOREIGN KEY("exerciseCategoryID")
REFERENCES "exercise_categories" ("exerciseCategoryID");

ALTER TABLE "class_exercises" ADD CONSTRAINT "fk_class_exercises_lessonPlanID" FOREIGN KEY("lessonPlanID")
REFERENCES "lesson_plans" ("lessonPlanID");

ALTER TABLE "class_exercises" ADD CONSTRAINT "fk_class_exercises_exerciseID" FOREIGN KEY("exerciseID")
REFERENCES "exercises" ("exerciseID");

-- ALTER TABLE "class_exercises" ADD CONSTRAINT "fk_class_exercises_songID" FOREIGN KEY("songID")
-- REFERENCES "songs" ("songID");

ALTER TABLE "lesson_plans" ADD CONSTRAINT "fk_lesson_plans_levelID" FOREIGN KEY("levelID")
REFERENCES "levels" ("levelID");

