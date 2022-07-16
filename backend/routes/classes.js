"use strict";

/** Routes for class_exercises. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const ClassExercise = require("../models/class");

// const companyNewSchema = require("../schemas/companyNew.json");
// const companyUpdateSchema = require("../schemas/companyUpdate.json");
// const companySearchSchema = require("../schemas/companySearch.json");

const router = new express.Router();


/************* POST / { classExercise } =>  { classExercise }
 *
 * lesson plan should be { lessonPlanID, exerciseID, notes }
 * Returns { lessonPlanID, exerciseID, notes }
 *
 * EVENTUALLY -> Authorization required: admin
 */

router.post("/", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, companyNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const classExercise = await ClassExercise.create(req.body);
    return res.status(201).json({ classExercise });
  } catch (err) {
    return next(err);
  }
});





/*********** GET /[id]  =>  { all class exercises for a given lesson plan }
 *
 *  class exercises is { lessonPlanID, order, theme, focus, levelID }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const classExercises = await ClassExercise.get(req.params.id);
    return res.json({ classExercises });
  } catch (err) {
    return next(err);
  }
});




// /** PATCH /[id] { fld1, fld2, ... } => { exercise }
//  *
//  * Patches exercise data.
//  *
//  * fields can be: { description, hasProp, propDescription }
//  *
//  * Returns { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
//  *
//  * EVENTUALLY -> Authorization required: admin
//  */

// router.patch("/:id", async function (req, res, next) {
//   try {
//     // const validator = jsonschema.validate(req.body, companyUpdateSchema);
//     // if (!validator.valid) {
//     //   const errs = validator.errors.map(e => e.stack);
//     //   throw new BadRequestError(errs);
//     // }

//     const lessonPlan = await LessonPlan.update(req.params.id, req.body);
//     return res.json({ lessonPlan });
//   } catch (err) {
//     return next(err);
//   }
// });




// /************** DELETE /[id]  =>  { deleted: id }
//  *
//  * EVENTUALLY -> Authorization: admin
//  */

// router.delete("/:id", async function (req, res, next) {
//   try {
//     await LessonPlan.remove(req.params.id);
//     return res.json({ deleted: req.params.id });
//   } catch (err) {
//     return next(err);
//   }
// });


module.exports = router;