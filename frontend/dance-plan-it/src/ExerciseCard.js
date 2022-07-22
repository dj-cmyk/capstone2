import axios from "axios";
import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./ExerciseCard.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

function ExerciseCard({ exercise }) {

  const deleteExercise = async (id) => {
      let res = await axios.delete(`${BASE_URL}/exercises/${id}`)
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
            <Link to={`/exercises/update/${exercise.exerciseID}`} className="btn btn-outline-primary nav-buttons">Update</Link>
            <button className="btn btn-outline-danger nav-buttons" onClick={() => deleteExercise(exercise.exerciseID)}> Delete </button>
        </CardBody>
      </Card>
    </section>
  );
}

export default ExerciseCard;