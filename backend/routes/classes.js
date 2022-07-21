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

/*********** GET /[lessonPlanID/exerciseID]  =>  { one specific class exercise }
 *
 *  class exercises is { lessonPlanID, exerciseID, hasProp, propDescription, notes, sequence, spotifyURI }
 *
 * Authorization required: none
 */

 router.get("/:lessonPlanID/:exerciseID", async function (req, res, next) {
  try {
    const classExercise = await ClassExercise.getClassEx(req.params.lessonPlanID, req.params.exerciseID);
    console.log("***********", classExercise)
    return res.json({ classExercise });
  } catch (err) {
    return next(err);
  }
});




// /** PATCH /[id] { fld1, fld2, ... } => { class exercise }
//  *
//  * Patches class exercise data.
//  *
//  * fields can be: { hasProp, propDescription, notes, sequence, spotifyURI }
//  *
//  * Returns { levelCategoryID, exerciseCategoryID, hasProp, propDescription, notes, sequence, spotifyURI }
//  *
//  * EVENTUALLY -> Authorization required: admin
//  */

router.patch("/:lessonPlanID/:exerciseID", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, companyUpdateSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const classEx = await ClassExercise.update(req.params.lessonPlanID, req.params.exerciseID, req.body);
    return res.json({ classEx });
  } catch (err) {
    return next(err);
  }
});




// /************** DELETE /[lessonPlanid]/[exerciseID]  =>  { deleted: id }
//  *
//  * EVENTUALLY -> Authorization: admin
//  */

router.delete("/:lessonPlanID/:exerciseID", async function (req, res, next) {
  try {
    await ClassExercise.remove(req.params.lessonPlanID, req.params.exerciseID);
    return res.json({ deleted: {LessonPlan: req.params.lessonPlanID, Exercise: req.params.exerciseID} });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;