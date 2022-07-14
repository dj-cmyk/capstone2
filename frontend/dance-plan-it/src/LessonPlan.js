import React from 'react';



const LessonPlan = ({lessonPlan}) => {

  return (
    <section>
            <h3>Lesson Plan</h3>
            Order: {lessonPlan.order}
            Theme: {lessonPlan.theme}
            Focus: {lessonPlan.focus}
            LevelID: {lessonPlan.levelID}
        
    </section>
  );
}

export default LessonPlan;