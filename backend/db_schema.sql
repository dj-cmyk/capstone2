-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "teachers" (
    "teacherID" int   NOT NULL,
    "username" string   NOT NULL,
    "first_name" string   NOT NULL,
    "last_name" string   NOT NULL,
    "email" string   NOT NULL,
    "password" string   NOT NULL,
    CONSTRAINT "pk_teachers" PRIMARY KEY (
        "teacherID"
     ),
    CONSTRAINT "uc_teachers_username" UNIQUE (
        "username"
    )
);

CREATE TABLE "exercise_categories" (
    "exerciseCategoryID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_exercise_categories" PRIMARY KEY (
        "exerciseCategoryID"
     )
);

CREATE TABLE "level_categories" (
    "levelCategoryID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_level_categories" PRIMARY KEY (
        "levelCategoryID"
     )
);

CREATE TABLE "levels" (
    "levelID" int   NOT NULL,
    "name" string   NOT NULL,
    "levelCategoryId" int   NOT NULL,
    CONSTRAINT "pk_levels" PRIMARY KEY (
        "levelID"
     )
);

CREATE TABLE "exercises" (
    "exerciseID" int   NOT NULL,
    "levelCategoryID" int   NOT NULL,
    "exerciseCategoryID" int   NOT NULL,
    "description" string   NOT NULL,
    "hasProp" boolean   NOT NULL,
    "propDescription" string   NOT NULL,
    CONSTRAINT "pk_exercises" PRIMARY KEY (
        "exerciseID"
     )
);

CREATE TABLE "class_exercises" (
    "lessonPlanID" int   NOT NULL,
    "exerciseID" int   NOT NULL,
    -- this comes from external API? but needs to be stored in db to access??
    "songID" int   NOT NULL
);

CREATE TABLE "lesson_plans" (
    "lessonPlanID" int   NOT NULL,
    "order" int   NOT NULL,
    "theme" string   NULL,
    "levelID" int   NOT NULL,
    CONSTRAINT "pk_lesson_plans" PRIMARY KEY (
        "lessonPlanID"
     )
);

-- this must populate from API so maybe it should just be a link?
CREATE TABLE "songs" (
    "songID" int   NOT NULL,
    "name" string   NOT NULL,
    "artist" string   NOT NULL,
    "album" string   NOT NULL,
    CONSTRAINT "pk_songs" PRIMARY KEY (
        "songID"
     )
);

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

ALTER TABLE "class_exercises" ADD CONSTRAINT "fk_class_exercises_songID" FOREIGN KEY("songID")
REFERENCES "songs" ("songID");

ALTER TABLE "lesson_plans" ADD CONSTRAINT "fk_lesson_plans_levelID" FOREIGN KEY("levelID")
REFERENCES "levels" ("levelID");

