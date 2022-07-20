import {useState, useEffect} from "react";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ExerciseCard.css";


function ClassExercisesList() {
    let params = useParams();
    let id = params.id;

    const [classExercises, setClassExercises] = useState();
    

    useEffect(() => {
            fetch(`/classes/${id}`).then(res => {
                if(res.ok) {
                    return res.json()
                }
            }).then(jsonRes => setClassExercises(jsonRes.classExercises))
    });

    if (!classExercises) return <p>Loading &hellip;</p>;
    
    const deleteClassExercise = async (lessonPlanID, exerciseID) => {
        let res = await axios.delete(`http://localhost:3001/classes/${lessonPlanID}/${exerciseID}`)
        return res
    }

    return (
        <section className="Section">
            <Card className="Card">
                <CardBody className="Card-Body">
                    <CardTitle className="Card-Title">
                        Lesson Plan for Week {classExercises[0].order}
                    </CardTitle>

                    <CardText className="Card-Text">
                        <b>Theme:</b> {classExercises[0].theme}<br />
                        <b>Focus:</b> {classExercises[0].focus}
                    </CardText>
                </CardBody>
            </Card>
            <Card className="Card">
                <CardBody className="Card-Body">
                    <CardTitle className="Card-Title">
                        Exercises:
                    </CardTitle>

                    <CardText className="Card-Text">
                    
                        {classExercises.map(ce => (
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <div><b>{ce.name}</b> - {ce.description}</div>

                                    <a href={`/classes/update/${ce.lessonPlanID}/${ce.exerciseID}`} className="btn btn-outline-primary btn-sm nav-buttons">Update</a>
                                    
                                    <button className="btn btn-outline-danger btn-sm nav-buttons" onClick={() => deleteClassExercise(ce.lessonPlanID, ce.exerciseID)}> Delete </button>
                                </ListGroupItem>
                            </ListGroup>
                        ))}
                    </CardText>
                </CardBody>
            </Card>
            
        

        </section>
    );
}

export default ClassExercisesList;