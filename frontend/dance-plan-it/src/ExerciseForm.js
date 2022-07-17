import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Form.css";


const ExerciseForm = ({addNewExercise}) => {
  // set initial values of the form to be blank/empty
    const INITIAL_STATE = {
    levelCategoryID: '',
    exerciseCategoryID: '',
    description: ''
  }

  const [levelCategories, setLevelCategories] = useState([])
  const [exercisesCategories, setExerciseCategories] = useState([])
  

  useEffect(() => {
    fetch("/exercises/categories").then(res => {
        if(res.ok) {
            return res.json()
        }
    }).then(jsonRes => setExerciseCategories(jsonRes.exerciseCategories))

    fetch("/exercises/levelCategories").then(res => {
        if(res.ok) {
            return res.json()
        }
    }).then(jsonRes => setLevelCategories(jsonRes.levelCategories))
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

    // call API to add new exercise to DB
    addNewExercise({ ...formData })
    
    // redirect to exercise page to see newly added exercise
    navigate("/exercises", { replace: true });
    
    // reset the form to blank
    setFormData(INITIAL_STATE)
  }

  return (
    <Form onSubmit={handleSubmit} className="Form">
      <FormGroup>
        <Label htmlFor="levelCategoryID">Level Category: </Label>
        <Input
            id="levelCategoryID"
            type="select"
            name="levelCategoryID"
            value={formData.levelCategoryID}
            onChange={handleChange}
            className=""
        >
            <option>Select a Level Category</option>
            {levelCategories.map(lc => 
            (<option key={lc.levelCategoryID} value={lc.levelCategoryID}>{lc.name}</option>)
        )}
        </Input>
      </FormGroup>
      <FormGroup>
      <Label htmlFor="exerciseCategoryID">Exercise Category: </Label>
      <Input
        id="exerciseCategoryID"
        type="select"
        name="exerciseCategoryID"
        value={formData.exerciseCategoryID}
        onChange={handleChange}
        className=""
        >
        <option>Select an Exercise Category</option>
        {exercisesCategories.map(ec => 
            (<option key={ec.exerciseCategoryID} value={ec.exerciseCategoryID}>{ec.name}</option>)
        )}
    </Input>
      </FormGroup>
      <FormGroup>
      <Label htmlFor="description">Description: </Label>
      <Input
        id="description"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className=""
      />
      </FormGroup>
      
      <Button>Add Exercise</Button>
    </Form>
  )

}

export default ExerciseForm;