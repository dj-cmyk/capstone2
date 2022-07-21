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

    const initialState = {
        lessonPlanID: lessonPlanID,
        description: '',
        sequence: '',
        hasProp: false,
        propDescription: '',
        spotifyURI: ''
        }
    const [checked, setChecked] = useState(initialState.hasProp)

  useEffect(() => {
    const getData = async () => {
        let classEx = await axios.get(`/classes/${lessonPlanID}/${exerciseID}`)

        classEx.data.classExercise.hasProp ? setChecked(true) : setChecked(false)

        setFormData({
            lessonPlanID: lessonPlanID,
            description: classEx.data.classExercise.description,
            sequence: classEx.data.classExercise.sequence,
            hasProp: checked,
            propDescription: classEx.data.classExercise.propDescription,
            spotifyURI: classEx.data.classExercise.spotifyURI
            }) 
      }
      
    // call the function
    getData()
        // make sure to catch any error
        .catch(console.error);    
    
    }, [lessonPlanID, exerciseID])


  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()

  const updateClassEx = async (lessonPlanID, exerciseID, data) => {
        let dataToSend = {
            sequence: data.sequence,
            hasProp: checked,
            propDescription: data.propDescription,
            notes: data.notes,
            spotifyURI: data.spotifyURI
        }
        let res = await axios.patch(`http://localhost:3001/classes/${lessonPlanID}/${exerciseID}`, dataToSend)
        console.log("updated class ex")
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
    if(e.target.type === "checkbox") {
        setChecked(!checked)
    }
    
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
    navigate(`/classes/list/${lessonPlanID}`, { replace: true });
    
    // reset the form to blank
    setFormData(initialState)
  }

  return (
    <Container>
        <Form onSubmit={handleSubmit} className="Form">
        
        <FormGroup>
            <Label htmlFor="lessonPlanID"><b>LessonPlan:</b> {formData.lessonPlanID}</Label>

        </FormGroup>
        <FormGroup>
            <Label htmlFor="description"><b>Exercise Description:</b> {formData.description}</Label>

        </FormGroup>
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
            checked={checked}
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
        
        <Button>Update Exercise in Lesson Plan</Button>
        </Form>

        <SearchBar getURI={getURI}/>
    </Container>
  )

}

export default  ClassExerciseUpdateForm;