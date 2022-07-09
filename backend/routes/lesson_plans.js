"use strict";

/** Routes for lesson plans. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const LessonPlan = require("../models/lesson_plan");

// const companyNewSchema = require("../schemas/companyNew.json");
// const companyUpdateSchema = require("../schemas/companyUpdate.json");
// const companySearchSchema = require("../schemas/companySearch.json");

const router = new express.Router();


/************* POST / { lessonPlan } =>  { lessonPlan }
 *
 * lesson plan should be { order, theme, focus, levelID }
 * Returns { lessonPlanID, order, theme, focus, levelID }
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

    const lessonPlan = await LessonPlan.create(req.body);
    return res.status(201).json({ lessonPlan });
  } catch (err) {
    return next(err);
  }
});

/**************** GET /  =>
 *   { lesson plans: [ { lessonPlanID, order, theme, focus, levelID }, ...] }
 *
 * EVENTUALLY -> Can filter on provided search filters:
 * - levelID
 * - focus
 * - theme
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
//   const q = req.query;
//   // arrive as strings from querystring, but we want as ints
//   if (q.minEmployees !== undefined) q.minEmployees = +q.minEmployees;
//   if (q.maxEmployees !== undefined) q.maxEmployees = +q.maxEmployees;

  try {
    // const validator = jsonschema.validate(q, companySearchSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const lessonPlans = await LessonPlan.findAll();
    // console.log(exercises)
    return res.json({ lessonPlans });
  } catch (err) {
    return next(err);
  }
});




/*********** GET /[id]  =>  { lessonPlan }
 *
 *  lessonPlan is { lessonPlanID, order, theme, focus, levelID }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const lessonPlan = await LessonPlan.get(req.params.id);
    return res.json({ lessonPlan });
  } catch (err) {
    return next(err);
  }
});




/** PATCH /[id] { fld1, fld2, ... } => { exercise }
 *
 * Patches exercise data.
 *
 * fields can be: { description, hasProp, propDescription }
 *
 * Returns { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
 *
 * EVENTUALLY -> Authorization required: admin
 */

router.patch("/:id", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, companyUpdateSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const lessonPlan = await LessonPlan.update(req.params.id, req.body);
    return res.json({ lessonPlan });
  } catch (err) {
    return next(err);
  }
});




/************** DELETE /[id]  =>  { deleted: id }
 *
 * EVENTUALLY -> Authorization: admin
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await LessonPlan.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
