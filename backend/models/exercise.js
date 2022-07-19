"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");



/** Related functions for exercises. */

class Exercise {
    /** Create an exercise, update db, return new exercise data.
     * data should be { levelCategoryID, exerciseCategoryID, description }
     *
     * Returns { levelCategoryID, exerciseCategoryID, description }
     * */
  
    static async create({ levelCategoryID, exerciseCategoryID, description }) {
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
             ("levelCategoryID", "exerciseCategoryID", description)
             VALUES ($1, $2, $3)
             RETURNING "levelCategoryID", "exerciseCategoryID", description`,
          [
            levelCategoryID,
            exerciseCategoryID,
            description
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
                            ec."name",
                            e.description
                     FROM exercises AS e
                     JOIN exercise_categories AS ec
                     ON e."exerciseCategoryID" = ec."exerciseCategoryID"`;
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

      static async getCategories() {
        let query = `SELECT ec."exerciseCategoryID",
                            ec."name"
                     FROM exercise_categories AS ec`;
        
        const categoriesRes = await db.query(query);
        return categoriesRes.rows;
      }

      static async getLevelCategories() {
        let query = `SELECT lc."levelCategoryID",
                            lc."name"
                     FROM level_categories AS lc`;
        
        const categoriesRes = await db.query(query);
        return categoriesRes.rows;
      }

     /************ Given an exercise id, return data about exercise.
   *
   * Returns { levelCategoryID, exerciseCategoryID, description}
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const exerciseRes = await db.query(
          `SELECT 
                "levelCategoryID", 
                "exerciseCategoryID", 
                description
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
   * Data can include: {description}
   *
   * Returns {levelCategoryID, exerciseCategoryID, description}
   *
   * Throws NotFoundError if not found.
   */

   static async update(id, data) {

    const updateRes = await db.query(
                      `UPDATE exercises 
                      SET description = $1
                      WHERE "exerciseID" = $2
                      RETURNING "levelCategoryID", 
                                "exerciseCategoryID", 
                                description`, [data, id]);
    
    const exercise = updateRes.rows[0];

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