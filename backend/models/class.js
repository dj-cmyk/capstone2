"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");



/** Related functions for lesson plans. */

class ClassExercise {
    /** Create a class exercise framework, update db, return new class_exercise data.
     * data should be { lessonPlanId, exerciseID, hasProp, propDescription, notes, spotifyURI }
     *
     * Returns { lessonPlanId, exerciseID, hasProp, propDescription, notes, spotifyURI }
     * */
  
    static async create({ lessonPlanID, exerciseID, hasProp, propDescription, notes, sequence, spotifyURI }) {
      const duplicateCheck = await db.query(
            `SELECT "lessonPlanID", "exerciseID"
             FROM class_exercises
             WHERE "lessonPlanID" = $1 
             AND "exerciseID" = $2`,
          [lessonPlanID, exerciseID]);
  
      if (duplicateCheck.rows[0])
        throw new BadRequestError(`Duplicate class with lesson plan: ${lessonPlanID} and exercise: ${exerciseID}`);
  
      const result = await db.query(
            `INSERT INTO classes
             ("lessonPlanID", "exerciseID", "hasProp", "propDescription", "notes", "sequence", "spotifyURI")
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING "lessonPlanID", "exerciseID", "hasProp", "propDescription", notes, sequence, "spotifyURI"`,
          [
            lessonPlanID,
            exerciseID,
            hasProp,
            propDescription,
            notes,
            sequence, 
            spotifyURI
          ],
      );
      const class_exercise = result.rows[0];
  
      return class_exercise;
    }






     /************ Given an lesson plan id, return all class exercises and notes.
   *
   * Returns { lessonPlanID, exercise information (category, description, hasProp, propDescription) }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const classExercisesRes = await db.query(
          `SELECT 
              lp.order, 
              lp.theme, 
              lp.focus, 
              levels.name, 
              e.description, 
              c."hasProp", 
              c."propDescription", 
              c.notes,
              c.sequence,
              c."spotifyURI",
              ec.name
            FROM classes AS c
            JOIN lesson_plans AS lp
                ON c."lessonPlanID" = lp."lessonPlanID"
            JOIN exercises AS e
                ON c."exerciseID" = e."exerciseID"
            JOIN levels
                ON lp."levelID" = levels."levelID"
            JOIN exercise_categories AS ec
                ON e."exerciseCategoryID" = ec."exerciseCategoryID"
            WHERE c."lessonPlanID" = $1
            ORDER BY c.sequence`,
        [id]);

    const classExercises = classExercisesRes.rows;

    if (!classExercises) throw new NotFoundError(`No class exercises for lesson plan: ${id}`);

    return classExercises;
  }


  /*********** Update lesson plan data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {order, theme, focus}
   *
   * Returns {lessonPlanID, order, theme, focus, "levelID"}
   *
   * Throws NotFoundError if not found.
   */

//    static async update(id, data) {
//     const { setCols, values } = sqlForPartialUpdate(
//         data,
//         {
//           order: "order",
//           theme: "theme",
//           focus: "focus"
//         });
//     const handleVarIdx = "$" + (values.length + 1);

//     const querySql = `UPDATE lesson_plans 
//                       SET ${setCols} 
//                       WHERE "lessonPlanID" = ${handleVarIdx} 
//                       RETURNING "lessonPlanID", 
//                                 "order", 
//                                 theme, 
//                                 focus, 
//                                 "levelID"`;
//     const result = await db.query(querySql, [...values, id]);
//     const lessonPlan = result.rows[0];

//     if (!lessonPlan) throw new NotFoundError(`No lesson plan: ${id}`);

//     return lessonPlan;
//   }


    /*************** Delete given lesson plan from database; returns undefined.
   *
   * Throws NotFoundError if exercise not found.
   **/

//   static async remove(id) {
//     const result = await db.query(
//           `DELETE
//            FROM lesson_plans
//            WHERE "lessonPlanID" = $1
//            RETURNING "lessonPlanID"`,
//         [id]);
//     const lessonPlan = result.rows[0];

//     if (!lessonPlan) throw new NotFoundError(`No lesson plan: ${id}`);
//   }
}


module.exports = ClassExercise;