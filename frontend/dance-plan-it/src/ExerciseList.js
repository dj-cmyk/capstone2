import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import ExerciseCard from "./ExerciseCard";

function ExerciseList() {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        fetch("/exercises").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setExercises(jsonRes.exercises))
    })


  return (
    <section>
            <h2>Exercise List</h2>
            {exercises.map(ex => (<ExerciseCard exercise={ex} key={ex.exerciseID} />
            ))}
        
    </section>
  );
}



export default ExerciseList;