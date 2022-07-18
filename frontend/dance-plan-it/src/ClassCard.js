import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import Player from "./Player";
import useAuth from "./useAuth";
import "./ExerciseCard.css";

function ClassCard({ classExercise, code }) {
    const accessToken = useAuth(code)
    // console.log(accessToken)
  return (
    
      <Card className="Card">
        <CardBody className="Card-Body">

          <CardTitle className="Card-Title">
            {classExercise.name}
          </CardTitle>

          <CardText className="Card-Text">
            {classExercise.description}
          </CardText>
          {classExercise.hasProp ? 
                <p className="Card-SubText">
                  <b>Prop Description:</b> {classExercise.propDescription}
                </p> 
                : ""}
                {classExercise.notes ? 
                <p className="Card-SubText">
                <b>Notes:</b> {classExercise.notes}
              </p> 
              : ""}
                <section className="Section">
            <Player accessToken={accessToken} uri={classExercise.spotifyURI}/>
            </section>
        </CardBody>
      </Card>
    
  );
}

export default ClassCard;