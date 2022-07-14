"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const { NotFoundError } = require("./expressError");

// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
// const usersRoutes = require("./routes/users");
const exercisesRoutes = require("./routes/exercises");
const lessonPlansRoutes = require("./routes/lesson_plans");
const classExercisesRoutes = require("./routes/class_exercises");


const app = express();
app.use(cors())
app.use(bodyParser.json())

app.use(express.json());
// app.use(authenticateJWT);

// app.use("/auth", authRoutes);
// app.use("/users", usersRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/lessonPlans", lessonPlansRoutes);
app.use("/classExercises", classExercisesRoutes);



app.post('/login', (req, res) => {
    
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "a8701db3365941aea943d79b1b826150",
        clientSecret: "e2790e90405f401a8747290094f1ae33"
    })

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        }).catch(() => {
            console.log("here is a problem")
            res.sendStatus(400)
        })      
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "a8701db3365941aea943d79b1b826150",
        clientSecret: "e2790e90405f401a8747290094f1ae33",
        refreshToken
    })

    spotifyApi.refreshAccessToken()
        .then(
            data => {
            console.log('The access token has been refreshed!');
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
            console.log(data.body)
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        }).catch((err) => {
            console.log('Could not refresh access token', err);
            res.sendStatus(400)
          });
})


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
