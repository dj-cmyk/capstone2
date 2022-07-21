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
    "exerciseID" SERIAL PRIMARY KEY,
    "levelCategoryID" int   NOT NULL,
    "exerciseCategoryID" int   NOT NULL,
    "description" text   NOT NULL
);

CREATE TABLE "classes" (
    "lessonPlanID" int   NOT NULL,
    "exerciseID" int   NOT NULL, 
    "hasProp" boolean   NOT NULL,
    "propDescription" text,
    "notes" text, 
    "sequence" int NOT NULL,
    "spotifyURI" text NOT NULL,
    PRIMARY KEY ("lessonPlanID", "exerciseID")
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

ALTER TABLE "levels" ADD CONSTRAINT "fk_levels_levelCategoryId" FOREIGN KEY("levelCategoryId")
REFERENCES "level_categories" ("levelCategoryID");

ALTER TABLE "exercises" ADD CONSTRAINT "fk_exercises_levelCategoryID" FOREIGN KEY("levelCategoryID")
REFERENCES "level_categories" ("levelCategoryID");

ALTER TABLE "exercises" ADD CONSTRAINT "fk_exercises_exerciseCategoryID" FOREIGN KEY("exerciseCategoryID")
REFERENCES "exercise_categories" ("exerciseCategoryID");

ALTER TABLE "classes" ADD CONSTRAINT "fk_class_exercises_lessonPlanID" FOREIGN KEY("lessonPlanID")
REFERENCES "lesson_plans" ("lessonPlanID");

ALTER TABLE "classes" ADD CONSTRAINT "fk_class_exercises_exerciseID" FOREIGN KEY("exerciseID")
REFERENCES "exercises" ("exerciseID");

ALTER TABLE "lesson_plans" ADD CONSTRAINT "fk_lesson_plans_levelID" FOREIGN KEY("levelID")
REFERENCES "levels" ("levelID");

