import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import LessonPlan from './LessonPlan';
import "./ExerciseCard.css";


function LessonPlans() {
    const [lessonPlans, setLessonPlans] = useState([])

    useEffect(() => {
        fetch("/lessonPlans").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setLessonPlans(jsonRes.lessonPlans))
    })


  return (
    <section>
            <h2>Lesson Plans List</h2>
            <Link to={`/lessonPlans/new`} className="btn btn-outline-secondary btn-lg nav-buttons">Add New Lesson Plan</Link>
            {lessonPlans.map(lp => (<LessonPlan lessonPlan={lp} key={lp.lessonPlanID} level={"Ballet 2"}/>
            ))}
        
    </section>
  );
}

export default LessonPlans;