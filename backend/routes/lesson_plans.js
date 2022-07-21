/** Routes for lesson plans. */

const express = require("express");

const LessonPlan = require("../models/lesson_plan");

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
  try {
    const lessonPlans = await LessonPlan.findAll();
    return res.json({ lessonPlans });
  } catch (err) {
    return next(err);
  }
});


router.get("/levels", async function (req, res, next) {
  try {
    const levels = await LessonPlan.getLevels();
    return res.json({ levels });
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


// GET all lesson plans for a specific levelID
router.get("/levels/:levelID", async function (req, res, next) {
  try {
    const lessonPlans = await LessonPlan.findAllByLevel(req.params.levelID);
    return res.json({ lessonPlans });
  } catch (err) {
    return next(err);
  }
});



/** PATCH /[id] { fld1, fld2, ... } => { lesson plan }
 *
 * Patches lesson plan data.
 *
 * fields can be: { order, theme, focus }
 *
 * Returns { lessonPlanID, order, theme, focus }
 *
 * EVENTUALLY -> Authorization required: admin
 */

router.patch("/:id", async function (req, res, next) {
  try {
    const lessonPlan = await LessonPlan.update(req.params.id, req.body);
    return res.json({ lessonPlan });
  } catch (err) {
    return next(err);
  }
});




/************** DELETE /[id]  =>  { deleted: id }
 *
 *  Deletes single lesson plan
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
