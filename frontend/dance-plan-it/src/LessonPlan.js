import React from 'react';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./ExerciseCard.css";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

function LessonPlan({ lessonPlan, level }) {

  const deleteLessonPlan = async (id) => {
    let res = await axios.delete(`${BASE_URL}/lessonPlans/${id}`)
    return res
}

  return (
    <section className="Section">
      <Card className="Card">
        <CardBody className="Card-Body">
          <CardTitle className="Card-Title">
          {level} - WEEK {lessonPlan.order}
          </CardTitle>
            
              {lessonPlan.theme ? <div className="Card-SubText">
                  <b>Theme:</b> {lessonPlan.theme} </div> : ""}
              {lessonPlan.focus ? <div className="Card-SubText">
                  <b>Focus:</b> {lessonPlan.focus} </div> : ""} 
            
            <Link 
              to={`/classes/list/${lessonPlan.lessonPlanID}`} 
              className="btn btn-outline-secondary nav-buttons">
                List
            </Link>
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