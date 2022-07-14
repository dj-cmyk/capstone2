"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");



/** Related functions for exercises. */

class Exercise {
    /** Create an exercise, update db, return new exercise data.
     * data should be { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
     *
     * Returns { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
     * */
  
    static async create({ levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }) {
      const duplicateCheck = await db.query(
            `SELECT "exerciseID"
             FROM exercises
             WHERE description = $1`,
          [description]);

        console.log(duplicateCheck.rows)
  
      if (duplicateCheck.rows[0])
        throw new BadRequestError(`Duplicate exercise: ${description}`);
  
      const result = await db.query(
            `INSERT INTO exercises
             ("levelCategoryID", "exerciseCategoryID", description, "hasProp", "propDescription")
             VALUES ($1, $2, $3, $4, $5)
             RETURNING "levelCategoryID", "exerciseCategoryID", description, "hasProp", "propDescription"`,
          [
            levelCategoryID,
            exerciseCategoryID,
            description,
            hasProp,
            propDescription,
          ],
      );
      const exercise = result.rows[0];
  
      return exercise;
    }


    /** Get all exercises, return array of exercises
     * data should be { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
     *
     * Returns { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
     * */
  
     static async findAll() {
        let query = `SELECT e."exerciseID",
                            e."levelCategoryID",
                            e."exerciseCategoryID",
                            c."name",
                            e.description,
                            e."hasProp",
                            e."propDescription"
                     FROM exercises AS e
                     JOIN exercise_categories AS c
                     ON e."exerciseCategoryID" = c."exerciseCategoryID"`;
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
        const exercisesRes = await db.query(query);
        return exercisesRes.rows;
      }




     /************ Given an exercise id, return data about exercise.
   *
   * Returns { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const exerciseRes = await db.query(
          `SELECT 
                "levelCategoryID", 
                "exerciseCategoryID", 
                description, 
                "hasProp", 
                "propDescription"
           FROM exercises
           WHERE "exerciseID" = $1`,
        [id]);

    const exercise = exerciseRes.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise: ${id}`);

    return exercise;
  }


  /*********** Update exercise data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {description, hasProp, propDescription}
   *
   * Returns {levelCategoryID, exerciseCategoryID, description, hasProp, propDescription}
   *
   * Throws NotFoundError if not found.
   */

   static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          description: "description",
          hasProp: "hasProp",
          propDescription: "propDescription"
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE exercises 
                      SET ${setCols} 
                      WHERE "exerciseID" = ${handleVarIdx} 
                      RETURNING "levelCategoryID", 
                                "exerciseCategoryID", 
                                description, 
                                "hasProp", 
                                "propDescription"`;
    const result = await db.query(querySql, [...values, id]);
    const exercise = result.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise: ${id}`);

    return exercise;
  }


    /*************** Delete given exercise from database; returns undefined.
   *
   * Throws NotFoundError if exercise not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM exercises
           WHERE "exerciseID" = $1
           RETURNING "exerciseID"`,
        [id]);
    const exercise = result.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise: ${id}`);
  }
}


module.exports = Exercise;