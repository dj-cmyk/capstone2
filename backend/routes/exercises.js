/** Routes for exercises. */

const express = require("express");

const Exercise = require("../models/exercise");

const router = new express.Router();


/************* POST / { exercise } =>  { exercises }
 *
 * exercise should be { levelCategoryID, exerciseCategoryID, description }
 * Returns { levelCategoryID, exerciseCategoryID, description }
 *
 * EVENTUALLY -> Authorization required: admin
 */

router.post("/", async function (req, res, next) {
  try {
      const exercise = await Exercise.create(req.body);
      return res.status(201).json({ exercise });
  } catch (err) {
    return next(err);
  }
});

/**************** GET /  =>
 *   { exercises: [ { levelCategoryID, exerciseCategoryID, description } ] }
 *
 * EVENTUALLY -> Can filter on provided search filters:
 * - levelCategoryID
 * - exerciseCategoryID
 *
 *   { categories: [ { exerciseCategoryID, name } ] }
 * 
 *   { levelCategories: [ { levelCategoryID, name } ] }
 * 
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    const exercises = await Exercise.findAll();
    return res.json({ exercises });
  } catch (err) {
    return next(err);
  }
});

router.get("/categories", async function (req, res, next) {
    try {
      const exerciseCategories = await Exercise.getCategories();
      return res.json({ exerciseCategories });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/levelCategories", async function (req, res, next) {
    try {
      const levelCategories = await Exercise.getLevelCategories();
      return res.json({ levelCategories });
    } catch (err) {
      return next(err);
    }
  });



/*********** GET /[id]  =>  { exercise }
 *
 *  Exercise is { levelCategoryID, exerciseCategoryID, description }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const exercise = await Exercise.get(req.params.id);
    return res.json({ exercise });
  } catch (err) {
    return next(err);
  }
});




/** PATCH /[id] { fld1, fld2, ... } => { exercise }
 *
 * Patches exercise data.
 *
 * fields can be: { description }
 *
 * Returns { levelCategoryID, exerciseCategoryID, description }
 *
 * EVENTUALLY -> Authorization required: admin
 */

router.patch("/:id", async function (req, res, next) {
  try {
    const exercise = await Exercise.update(req.params.id, req.body.description);
    return res.json({ exercise });
  } catch (err) {
    return next(err);
  }
});




/************** DELETE /[id]  =>  { deleted: id }
 *
 *  Deletes a single exercise
 * 
 * EVENTUALLY -> Authorization: admin
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await Exercise.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
