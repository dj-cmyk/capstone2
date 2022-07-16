import {useState, useEffect} from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import {useParams} from "react-router-dom";
import ClassCard from "./ClassCard";
import "./ExerciseCard.css";


function ClassExercises({code}) {
    let params = useParams();
    let id = params.id;

    const [classExercises, setClassExercises] = useState();
    const [sequence, setSequence] = useState(0);

    useEffect(() => {
            fetch(`/classes/${id}`).then(res => {
                if(res.ok) {
                    return res.json()
                }
            }).then(jsonRes => setClassExercises(jsonRes.classExercises))
    }, []);

    if (!classExercises) return <p>Loading &hellip;</p>;

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

            <ClassCard classExercise={classExercises[sequence]} code={code}/>
        
            <div>
                {sequence !== 0 ? <button className="btn btn-outline-secondary btn-lg nav-buttons" onClick={() => setSequence(sequence - 1)}> Previous </button> : ""}
                {sequence !== (classExercises.length - 1) ?  <button className="btn btn-outline-success btn-lg nav-buttons" onClick={() => setSequence(sequence + 1)}> Next </button> : ""}
               
            </div>
        </section>
    );
}

export default ClassExercises;