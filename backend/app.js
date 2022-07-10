"use strict";

const express = require("express");


const { NotFoundError } = require("./expressError");

// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
// const usersRoutes = require("./routes/users");
const exercisesRoutes = require("./routes/exercises");
const lessonPlansRoutes = require("./routes/lesson_plans");
const classExercisesRoutes = require("./routes/class_exercises");


const app = express();

app.use(express.json());
// app.use(authenticateJWT);

// app.use("/auth", authRoutes);
// app.use("/users", usersRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/lessonPlans", lessonPlansRoutes);
app.use("/classExercises", classExercisesRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
