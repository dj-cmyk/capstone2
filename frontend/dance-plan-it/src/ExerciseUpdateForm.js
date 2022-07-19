import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import "./Form.css";


const ExerciseUpdateForm = () => {
    let params = useParams();
    let id = params.id;


  const [initialState, setInitialState] = useState({
    levelCategoryID: '',
    exerciseCategoryID: '',
    description: ''
  })
  

  useEffect(() => {
    fetch(`/exercises/${id}`).then(res => {
        if(res.ok) {
            return res.json()
        }
    }).then(jsonRes => setInitialState(jsonRes.exercise))
    console.log(initialState)
    }, [id])

  // initialize state for the form (blank) and prepare to re-route with useHistory once form is submitted
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()

  const updateExercise = async (id, data) => {
        let dataToSend = {
            description: data.description
        }
        let res = await axios.patch(`http://localhost:3001/exercises/${id}`, dataToSend)
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
    updateExercise(id, {...formData} )
    
    // redirect to exercise page to see newly added exercise
    navigate("/exercises", { replace: true });
    
    // reset the form to blank
    setFormData(initialState)
  }

  return (
    <Form onSubmit={handleSubmit} className="Form">
      
      <FormGroup>
      <Label htmlFor="exerciseCategoryID">Exercise Category: {initialState.exerciseCategoryID}</Label>
      </FormGroup>
      <FormGroup>
      <Label htmlFor="description">Description: </Label>
      <Input
        id="description"
        type="text"
        name="description"
        placeholder={initialState.description}
        value={formData.description}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      
      <Button>Update Exercise</Button>
    </Form>
  )

}

export default ExerciseUpdateForm;