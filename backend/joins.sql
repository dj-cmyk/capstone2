SELECT 
    lp.order, 
    lp.theme, 
    lp.focus, 
    levels.name, 
    exercises.description, 
    exercises."hasProp", 
    exercises."propDescription", 
    ec.name
    ce.notes
FROM class_exercises AS ce
JOIN lesson_plans AS lp
    ON ce."lessonPlanID" = lp."lessonPlanID"
JOIN exercises
    ON ce."exerciseID" = exercises."exerciseID"
JOIN levels
    ON lp."levelID" = levels."levelID"
JOIN exercise_categories AS ec
    ON exercises."exerciseCategoryID" = ec."exerciseCategoryID"



