import React from 'react';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./ExerciseCard.css";



function LessonPlan({ lessonPlan, level }) {

  const deleteLessonPlan = async (id) => {
    let res = await axios.delete(`http://localhost:3001/lessonPlans/${id}`)
    return res
}

  return (
    <section className="Section">
      <Card className="Card">
        <CardBody className="Card-Body">
          <CardTitle className="Card-Title">
          {level} - WEEK {lessonPlan.order}
          </CardTitle>
            <CardText className="Card-Text">
              {lessonPlan.theme ? <p className="Card-SubText">
                  <b>Theme:</b> {lessonPlan.theme} </p> : ""}
              {lessonPlan.focus ? <p className="Card-SubText">
                  <b>Focus:</b> {lessonPlan.focus} </p> : ""} 
            </CardText>
            <Link 
              to={`/classes/${lessonPlan.lessonPlanID}`} 
              className="btn btn-outline-success nav-buttons">
                Start
            </Link>
            <Link 
              to={`/lessonPlans/update/${lessonPlan.lessonPlanID}`} 
              className="btn btn-outline-primary nav-buttons">
                Update
            </Link>
            <button className="btn btn-outline-danger nav-buttons" onClick={() => deleteLessonPlan(lessonPlan.lessonPlanID)}> Delete </button>
            
        </CardBody>
      </Card>
    </section>
  );
}

export default LessonPlan;