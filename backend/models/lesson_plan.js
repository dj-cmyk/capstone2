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
        throw new BadRequestError(`Duplicate lesson plan for theme: ${theme}`);
  
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
        
        const lessonPlanRes = await db.query(query);
        return lessonPlanRes.rows;
      }


      static async getLevels() {
        let query = `SELECT l."levelID",
                            l."name"
                     FROM levels AS l`;
        
        const levelsRes = await db.query(query);
        return levelsRes.rows;
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



  //get all lesson plans filtered by levelID
  static async findAllByLevel(levelID) {
    const lessonPlanByLevelRes = await db.query(
      `SELECT 
            "lessonPlanID", 
            "order", 
            theme, 
            focus, 
            "levelID"
       FROM lesson_plans
       WHERE "levelID" = $1
       ORDER BY "order"`,
    [levelID]);

    const lessonPlansByLevel = lessonPlanByLevelRes.rows;

    if (!lessonPlansByLevel) throw new NotFoundError(`No lesson Plan for level: ${LevelID}`);

    return lessonPlansByLevel;
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