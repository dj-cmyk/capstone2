SELECT 
    lp.order, 
    lp.theme, 
    lp.focus, 
    levels.name, 
    e.description, 
    c."hasProp", 
    c."propDescription", 
    c.notes,
    c."spotifyURI",
    ec.name
FROM classes AS c
JOIN lesson_plans AS lp
    ON c."lessonPlanID" = lp."lessonPlanID"
JOIN exercises AS e
    ON c."exerciseID" = e."exerciseID"
JOIN levels
    ON lp."levelID" = levels."levelID"
JOIN exercise_categories AS ec
    ON e."exerciseCategoryID" = ec."exerciseCategoryID"
WHERE c."lessonPlanID" = 2;



