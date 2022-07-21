import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap";
import './Dashboard.css';



const Dashboard = () => {
    const [levels, setLevels] = useState()


    useEffect(() => {
        fetch("/lessonPlans/levels").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setLevels(jsonRes.levels))
        }, []);

    if (!levels) return <p>Loading &hellip;</p>;

    return(
        <div className="container">
            <h1>Lesson Plans By Level</h1>
            {levels ? 
                (<ListGroup>
                    {levels.map(l => 
                        (<Link to={`/lessonPlans/levels/${l.levelID}`} key={l.levelID} value={l.levelID} className="btn btn-outline-secondary Dashboard-btn">Lesson Plans For {l.name}</Link>)
                    )}
                </ListGroup>) 
            : ""}
        
        </div>
    )
}


export default Dashboard;