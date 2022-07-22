import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import LessonPlan from './LessonPlan';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

const LessonPlansByLevel = () => {
    let params = useParams();
    let levelID = parseInt(params.levelID);
    
    const [lessonPlans, setLessonPlans] = useState([])
    const [levels, setLevels] = useState([])
    const [currLevel, setCurrLevel] = useState("")
    

    useEffect(() => {
        const getData = async () => {
            let res = await axios.get(`${BASE_URL}/lessonPlans/levels/${levelID}`)
            let levelsRes = await axios.get(`${BASE_URL}/lessonPlans/levels`)
            setLessonPlans(res.data.lessonPlans)
            
            setLevels(levelsRes.data.levels) 

            let currentLevel = levelsRes.data.levels.filter(level => {
                return level.levelID === levelID})
            setCurrLevel(currentLevel)
          }
          
        // call the function
        getData()
            // make sure to catch any error
            .catch(console.error);    

    },[levelID])

    if (!levels) return <p>Loading &hellip;</p>;

    

  return (
    <section>
            <h1>Lesson Plans</h1>
            {lessonPlans.map(lp => (<LessonPlan lessonPlan={lp} key={lp.lessonPlanID} level={currLevel[0].name}/>
            ))}
        
    </section>
  );
}

export default LessonPlansByLevel;