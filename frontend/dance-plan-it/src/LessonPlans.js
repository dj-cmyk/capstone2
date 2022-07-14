import {useState, useEffect} from 'react';
import LessonPlan from './LessonPlan';


const LessonPlans = () => {
    const [lessonPlans, setLessonPlans] = useState([])

    useEffect(() => {
        fetch("/lessonPlans").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setLessonPlans(jsonRes.lessonPlans))
    },[])


  return (
    <section>
            <h1>Lesson Plans</h1>
            {lessonPlans.map(lp => (<LessonPlan lessonPlan={lp} key={lp.lessonPlanID} />
            ))}
        
    </section>
  );
}

export default LessonPlans;