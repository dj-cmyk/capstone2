import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import "./Form.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

const LessonPlanUpdateForm = () => {
    let params = useParams();
    let id = params.id;


  const [initialState, setInitialState] = useState({
    order: '',
    theme: '',
    focus: '',
    levelID: 5
  })
  

  useEffect(() => {
    fetch(`${BASE_URL}/lessonPlans/${id}`).then(res => {
        if(res.ok) {
            return res.json()
        }
    }).then(jsonRes => setInitialState(jsonRes.lessonPlan))
    
    }, [id])

  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()

  const updateLessonPlan = async (id, data) => {
        // let dataToSend = {
        //     description: data.description
        // }
        let res = await axios.patch(`${BASE_URL}/lessonPlans/${id}`, data)
        return res
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
    updateLessonPlan(id, {...formData} )
    
    // redirect to exercise page to see newly added exercise
    navigate("/lessonPlans", { replace: true });
    
    // reset the form to blank
    setFormData(initialState)
  }

  return (
    <Form onSubmit={handleSubmit} className="Form">
      
      <FormGroup>
      <Label htmlFor="order">Order: </Label>
      <Input
        id="order"
        type="number"
        name="order"
        placeholder={initialState.order}
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
        placeholder={initialState.theme}
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
        placeholder={initialState.focus}
        value={formData.focus}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      
      <Button>Update Lesson Plan</Button>
    </Form>
  )

}

export default LessonPlanUpdateForm;