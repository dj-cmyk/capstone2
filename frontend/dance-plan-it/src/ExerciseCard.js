import axios from "axios";
import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./ExerciseCard.css";

function ExerciseCard({ exercise }) {

  const deleteExercise = async (id) => {
      let res = await axios.delete(`http://localhost:3001/exercises/${id}`)
      return res
  }


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
            <a href={`/exercises/update/${exercise.exerciseID}`} className="btn btn-outline-primary nav-buttons">Update</a>
            <button className="btn btn-outline-danger nav-buttons" onClick={() => deleteExercise(exercise.exerciseID)}> Delete </button>
        </CardBody>
      </Card>
    </section>
  );
}

export default ExerciseCard;