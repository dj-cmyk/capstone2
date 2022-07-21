/** Routes for class_exercises. */

const express = require("express");

const ClassExercise = require("../models/class");

const router = new express.Router();


/************* POST / { classExercise } =>  { classExercise }
 *
 * class exercises should be { lessonPlanID, exerciseID, hasProp, propDescription, notes, sequence, spotifyURI }
 * Returns { lessonPlanID, exerciseID, hasProp, propDescription, notes, sequence, spotifyURI }
 *
 * EVENTUALLY -> Authorization required: admin
 */

router.post("/", async function (req, res, next) {
  try {
    const classExercise = await ClassExercise.create(req.body);
    return res.status(201).json({ classExercise });
  } catch (err) {
    return next(err);
  }
});


/*********** GET /[id]  =>  { all class exercises for a given lesson plan id}
 *
 *  class exercises is { lessonPlanID, order, theme, focus, levelID, exercise description, hasProp, propDescription, notes, sequence, spotifyURI }
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
    return res.json({ classExercise });
  } catch (err) {
    return next(err);
  }
});


// /** PATCH /[lessonPlanID]/[exerciseID] { fld1, fld2, ... } => { class exercise }
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