"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");



/** Related functions for lesson plans. */

class LessonPlan {
    /** Create a lesson plan framework, update db, return new lesson plan data.
     * data should be { order, theme, focus, levelID }
     *
     * Returns { lessonPlanID, order, theme, focus, levelID }
     * */
  
    static async create({ order, theme, focus, levelID }) {
      const duplicateCheck = await db.query(
            `SELECT "lessonPlanID"
             FROM lesson_plans
             WHERE theme = $1`,
          [theme]);
  
      if (duplicateCheck.rows[0])
        throw new BadRequestError(`Duplicate exercise: ${description}`);
  
      const result = await db.query(
            `INSERT INTO lesson_plans
             ("order", "theme", "focus", "levelID")
             VALUES ($1, $2, $3, $4)
             RETURNING "lessonPlanID", "order", theme, focus, "levelID"`,
          [
            order,
            theme,
            focus,
            levelID,
          ],
      );
      const lesson_plan = result.rows[0];
  
      return lesson_plan;
    }


    /** Get all lesson plan overviews, return array of lesson plans
     * data should be { order, theme, focus, "levelID" }
     *
     * Returns { "lessonPlanID", order, theme, focus, "levelID" }
     * */
  
     static async findAll() {
        let query = `SELECT "lessonPlanID",
                            "order",
                            theme,
                            focus,
                            "levelID"
                     FROM lesson_plans`;
        // let whereExpressions = [];
        // let queryValues = [];
    
        // const { levelCategoryID, exerciseCategoryID, hasProp } = searchFilters;
    
        // // For each possible search term, add to whereExpressions and queryValues so
        // // we can generate the right SQL
    
        // if (minEmployees !== undefined) {
        //   queryValues.push(minEmployees);
        //   whereExpressions.push(`num_employees >= $${queryValues.length}`);
        // }
    
        // if (maxEmployees !== undefined) {
        //   queryValues.push(maxEmployees);
        //   whereExpressions.push(`num_employees <= $${queryValues.length}`);
        // }
    
        // if (name) {
        //   queryValues.push(`%${name}%`);
        //   whereExpressions.push(`name ILIKE $${queryValues.length}`);
        // }
    
        // if (whereExpressions.length > 0) {
        //   query += " WHERE " + whereExpressions.join(" AND ");
        // }
    
        // Finalize query and return results
    
        // query += " ORDER BY name";
        const lessonPlanRes = await db.query(query);
        return lessonPlanRes.rows;
      }




     /************ Given an lesson plan id, return data about lesson plan.
   *
   * Returns { lessonPlanID, order, theme, focus, "levelID" }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const lessonPlanRes = await db.query(
          `SELECT 
                "lessonPlanID", 
                "order", 
                theme, 
                focus, 
                "levelID"
           FROM lesson_plans
           WHERE "lessonPlanID" = $1`,
        [id]);

    const lessonPlan = lessonPlanRes.rows[0];

    if (!lessonPlan) throw new NotFoundError(`No lesson Plan: ${id}`);

    return lessonPlan;
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

   static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          order: "order",
          theme: "theme",
          focus: "focus"
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE lesson_plans 
                      SET ${setCols} 
                      WHERE "lessonPlanID" = ${handleVarIdx} 
                      RETURNING "lessonPlanID", 
                                "order", 
                                theme, 
                                focus, 
                                "levelID"`;
    const result = await db.query(querySql, [...values, id]);
    const lessonPlan = result.rows[0];

    if (!lessonPlan) throw new NotFoundError(`No lesson plan: ${id}`);

    return lessonPlan;
  }


    /*************** Delete given lesson plan from database; returns undefined.
   *
   * Throws NotFoundError if exercise not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM lesson_plans
           WHERE "lessonPlanID" = $1
           RETURNING "lessonPlanID"`,
        [id]);
    const lessonPlan = result.rows[0];

    if (!lessonPlan) throw new NotFoundError(`No lesson plan: ${id}`);
  }
}


module.exports = LessonPlan;