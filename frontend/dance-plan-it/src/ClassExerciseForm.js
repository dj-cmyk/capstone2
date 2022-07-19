import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Form.css";



const ClassExerciseForm = ({addNewClassExercise}) => {
  // set initial values of the form to be blank/empty
    const INITIAL_STATE = {
    lessonPlanID: '',
    exerciseID: '',
    sequence: '', 
    hasProp: false,
    propDescription: '',
    spotifyURI: ''
  }

    const [lessonPlans, setLessonPlans] = useState([])
    const [exercises, setExercises] = useState([])



  useEffect(() => {
        fetch("/lessonPlans").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setLessonPlans(jsonRes.lessonPlans))

        fetch("/exercises").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setExercises(jsonRes.exercises))
    }, [])





  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate()

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

    // call API to authenticate/validate login
    addNewClassExercise({ ...formData })
    
    // redirect to home page with logged in status
    navigate("/lessonPlans", { replace: true });
    
    // reset the form to blank
    setFormData(INITIAL_STATE)
  }

  return (
    <Container>
    <Form onSubmit={handleSubmit} className="Form">
      <FormGroup>
        <Label htmlFor="lessonPlanID">LessonPlan: </Label>
        <Input
          id="lessonPlanID"
          type="select"
          name="lessonPlanID"
          value={formData.lessonPlanID}
          onChange={handleChange}
          className=""
          >
          <option>Select a Lesson Plan</option>
          {lessonPlans.map(lp => 
              (<option key={lp.lessonPlanID} value={lp.lessonPlanID}>Theme: {lp.theme} - Focus: {lp.focus}</option>)
          )}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="exerciseID">Exercise: </Label>
        <Input
          id="exerciseID"
          type="select"
          name="exerciseID"
          value={formData.exerciseID}
          onChange={handleChange}
          className=""
          >
          <option>Select an Exercise</option>
          {exercises.map(ex => 
              (<option key={ex.exerciseID} value={ex.exerciseID}>Description: {ex.description}</option>)
          )}
        </Input>
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
        name="propDescription"
        value={formData.propDescription}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
     
      <Button>Add Exercise to Lesson Plan</Button>
    </Form>
    </Container>
  )

}

export default ClassExerciseForm;