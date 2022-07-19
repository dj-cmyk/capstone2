import React from 'react';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./ExerciseCard.css";



const LessonPlan = ({lessonPlan, level}) => {

  

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
            <Link to={`/classes/${lessonPlan.lessonPlanID}`} className="btn btn-outline-success nav-buttons">Start</Link>
            <Link to={`/classes/update/${lessonPlan.lessonPlanID}`} className="btn btn-outline-primary nav-buttons">Update</Link>
            <Link to={`/classes/delete/${lessonPlan.lessonPlanID}`} className="btn btn-outline-danger nav-buttons">Delete</Link>
            
        </CardBody>
      </Card>
    </section>
  );
}

export default LessonPlan;