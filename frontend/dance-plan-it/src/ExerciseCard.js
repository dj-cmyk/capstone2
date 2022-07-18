import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./ExerciseCard.css";

function ExerciseCard({ exercise }) {
  return (
    <section className="Section">
      <Card className="Card">
        <CardBody className="Card-Body">
          <CardTitle className="Card-Title">
            {exercise.name}
          </CardTitle>
          <CardText className="Card-Text">
            {exercise.description}
          </CardText>
          {exercise.hasProp ? 
                <p className="Card-SubText">
                  <b>Prop Description:</b> {exercise.propDescription}
                </p> 
                : ""}
            <button className="btn btn-outline-primary nav-buttons">Update</button>
            <button className="btn btn-outline-danger nav-buttons">Delete</button>
        </CardBody>
      </Card>
    </section>
  );
}

export default ExerciseCard;