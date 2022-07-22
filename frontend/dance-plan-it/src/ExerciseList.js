import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import ExerciseCard from "./ExerciseCard";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

function ExerciseList() {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/exercises`).then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setExercises(jsonRes.exercises))
    })


  return (
    <section>
            <h2>Exercise List</h2>
            <Link to={`/exercises/new`} className="btn btn-outline-secondary btn-lg nav-buttons">Add New Exercise</Link>
            {exercises.map(ex => (<ExerciseCard exercise={ex} key={ex.exerciseID} />
            ))}
        
    </section>
  );
}



export default ExerciseList;