import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Form.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

const LessonPlanForm = ({addNewLessonPlan}) => {
  // set initial values of the form to be blank/empty
    const INITIAL_STATE = {
    order: '',
    theme: '',
    focus: '', 
    levelID: ''
  }


  const [levels, setLevels] = useState([])
  

  useEffect(() => {
    fetch(`${BASE_URL}/lessonPlans/levels`).then(res => {
        if(res.ok) {
            return res.json()
        }
    }).then(jsonRes => setLevels(jsonRes.levels))
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
    addNewLessonPlan({ ...formData })
    
    // redirect to home page with logged in status
    navigate("/lessonPlans", { replace: true });
    
    // reset the form to blank
    setFormData(INITIAL_STATE)
  }

  return (
    <Form onSubmit={handleSubmit} className="Form">
      <FormGroup>
        <Label htmlFor="levelID">Level: </Label>
        <Input
          id="levelID"
          type="select"
          name="levelID"
          value={formData.levelID}
          onChange={handleChange}
          className=""
          >
          <option>Select a Level</option>
          {levels.map(l => 
              (<option key={l.levelID} value={l.levelID}>{l.name}</option>)
          )}
        </Input>
      </FormGroup>
      <FormGroup>
      <Label htmlFor="order">Order: </Label>
      <Input
        id="order"
        type="text"
        name="order"
        value={formData.order}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="theme">Theme: </Label>
      <Input
        id="theme"
        type="text"
        name="theme"
        value={formData.theme}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      <FormGroup>
      <Label htmlFor="focus">Focus: </Label>
      <Input
        id="focus"
        type="text"
        name="focus"
        value={formData.focus}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
     
      <Button>Add Lesson Plan Overview</Button>
    </Form>
  )

}

export default LessonPlanForm;