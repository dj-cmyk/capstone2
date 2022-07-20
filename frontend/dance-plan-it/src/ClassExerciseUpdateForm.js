import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from "axios";
import SearchBar from "./SearchBar";
import "./Form.css";


const ClassExerciseUpdateForm = () => {
    let params = useParams();
    let lessonPlanID = params.lessonPlanID
    let exerciseID = params.exerciseID

    
    const [exercise, setExercise] = useState()
    const [initialState, setInitialState] = useState({
        lessonPlanID: lessonPlanID,
        exerciseID: exerciseID,
        sequence: '', 
        hasProp: false,
        propDescription: '',
        spotifyURI: ''
    })
    

  useEffect(() => {
    fetch(`/classes/${lessonPlanID}/${exerciseID}`)
        .then(res => {
            if(res.ok) {
            return res.json()
            }
        })
        .then(jsonRes => setExercise(jsonRes.classExercise))

    exercise ? 
        setInitialState({
        lessonPlanID: lessonPlanID,
        exerciseID: exerciseID,
        sequence: exercise.sequence || '',
        hasProp: exercise.hasProp,
        propDescription: exercise.propDescription || '',
        spotifyURI: exercise.spotifyURI || ''
        })
    : setInitialState({
        lessonPlanID: lessonPlanID,
        exerciseID: exerciseID,
        sequence: '', 
        hasProp: false,
        propDescription: '',
        spotifyURI: ''
    })

    console.log(exercise.spotifyURI, exercise.sequence)
    }, [])


  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()

  const updateClassEx = async (lessonPlanID, exerciseID, data) => {
        let dataToSend = {
            description: data.description
        }
        let res = await axios.patch(`http://localhost:3001/classes/${lessonPlanID}/${exerciseID}`, dataToSend)
        return res
  }

  const getURI = (uri) => {
    setFormData({
      spotifyURI: uri
    })
  }

  // this makes it so react is controlling the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // call API to add new exercise to DB
    updateClassEx(lessonPlanID, exerciseID, {...formData} )
    
    // redirect to exercise page to see newly added exercise
    navigate("/exercises", { replace: true });
    
    // reset the form to blank
    setFormData(initialState)
  }

  return (
    <Container>
        <Form onSubmit={handleSubmit} className="Form">
        
        {/* <FormGroup>
            <Label htmlFor="lessonPlanID">LessonPlan: </Label>
            <Input
            id="lessonPlanID"
            type="text"
            name="lessonPlanID"
            value={initialState.lessonPlanID}
            onChange={handleChange}
            className=""
            >
            </Input>
        </FormGroup>
        <FormGroup>
            <Label htmlFor="exerciseID">Exercise: </Label>
            <Input
            id="exerciseID"
            type="text"
            name="exerciseID"
            value={initialState.exerciseID}
            onChange={handleChange}
            className=""
            >
            </Input>
        </FormGroup> */}
        <FormGroup>
        <Label htmlFor="sequence">Sequence: </Label>
        <Input
            id="sequence"
            type="number"
            name="sequence"
            value={formData.sequence}
            onChange={handleChange}
            className=""
        />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="hasProp">Has Prop</Label>
        <Input
            id="hasProp"
            type="checkbox"
            name="hasProp"
            value={formData.hasProp}
            onChange={handleChange}
            className=""
        />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="propDescription">Prop Description: </Label>
        <Input
            id="propDescription"
            type="text"
            name="propDescription"
            value={formData.propDescription}
            onChange={handleChange}
            className=""
        />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="notes">Notes: </Label>
        <Input
            id="notes"
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className=""
        />
        </FormGroup>
        <FormGroup>
        <Label htmlFor="spotifyURI">Spotify URI: </Label>
        <Input
            id="spotifyURI"
            type="text"
            name="spotifyURI"
            value={formData.spotifyURI}
            onChange={handleChange}
            className=""
        />
        </FormGroup>
        
        <Button>Add Exercise to Lesson Plan</Button>
        </Form>
        {/* <SearchBar getURI={getURI}/> */}
    </Container>
  )

}

export default  ClassExerciseUpdateForm;