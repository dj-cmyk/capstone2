"use strict";

/** Routes for exercises. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const Exercise = require("../models/exercise");

// const companyNewSchema = require("../schemas/companyNew.json");
// const companyUpdateSchema = require("../schemas/companyUpdate.json");
// const companySearchSchema = require("../schemas/companySearch.json");

const router = new express.Router();


/************* POST / { exercise } =>  { exercises }
 *
 * exercise should be { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
 * Returns { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
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
    console.log(req.body)
      const exercise = await Exercise.create(req.body);
      
      return res.status(201).json({ exercise });
  } catch (err) {
    return next(err);
  }
});

/**************** GET /  =>
 *   { exercises: [ { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }, ...] }
 *
 * EVENTUALLY -> Can filter on provided search filters:
 * - levelCategoryID
 * - exerciseCategoryID
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

    const exercises = await Exercise.findAll();
    // console.log(exercises)
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
 *  Exercise is { levelCategoryID, exerciseCategoryID, description, hasProp, propDescription }
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

    const exercise = await Exercise.update(req.params.id, req.body);
    return res.json({ exercise });
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
    await Exercise.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
