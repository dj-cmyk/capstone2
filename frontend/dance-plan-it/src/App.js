import './App.css';
import ExerciseList from './ExerciseList';
import NavBar from './Navbar';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import LessonPlan from './LessonPlans';
import Dashboard from './Dashboard';
import ClassExercises from './ClassExercises';
import ExerciseForm from './ExerciseForm';
import LessonPlanForm from './LessonPlanForm';
import LessonPlansByLevel from './LessonPlansByLevel';
import axios from 'axios';
import ClassExerciseForm from './ClassExerciseForm';
import ExerciseUpdateForm from './ExerciseUpdateForm';
import LessonPlanUpdateForm from './LessonPlanUpdateForm';
import ClassExercisesList from './ClassExercisesList';
import TokenContext from './TokenContext';
import useAuth from './useAuth';
import ClassExerciseUpdateForm from './ClassExerciseUpdateForm';



const code = new URLSearchParams(window.location.search).get("code")
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"

function App() {
  const accessToken = useAuth(code)

  const addNewExercise = async (exerciseFormData) => {
    let res = await axios.post(`${BASE_URL}/exercises/`, ({...exerciseFormData}))
    return res
  }

  const addNewLessonPlan = async (lessonPlanFormData) => {
    let res = await axios.post(`${BASE_URL}/lessonPlans/`, ({...lessonPlanFormData}))
    return res
  }

  const addNewClassExercise = async (classExerciseFormData) => {
    let res = await axios.post(`${BASE_URL}/classes/`, ({...classExerciseFormData}))
    return res
  }

  return (
    <div className="App">
      <BrowserRouter>
      <TokenContext.Provider value={accessToken} >
        <NavBar />
        <main>
          <Routes>
            { code ? <Route path="/" element={<Dashboard />} /> : <Route path="/" element={<Home />} />}
            
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/exercises/new" element={<ExerciseForm addNewExercise={addNewExercise}/>} />
            <Route path="/exercises/update/:id" element={<ExerciseUpdateForm />} />
            <Route path="/lessonPlans" element={<LessonPlan />} />
            <Route path="/lessonPlans/new" element={<LessonPlanForm addNewLessonPlan={addNewLessonPlan}/>} />
            <Route path="/lessonPlans/update/:id" element={<LessonPlanUpdateForm />} />
            <Route path="/lessonPlans/levels/:levelID" element={<LessonPlansByLevel  />} />
            <Route path="/classes/:id" element={<ClassExercises />} />
            <Route path="/classes/list/:id" element={<ClassExercisesList />} />
            <Route path="/classes/new" element={<ClassExerciseForm addNewClassExercise={addNewClassExercise} />} />
            <Route path="/classes/update/:lessonPlanID/:exerciseID" element={<ClassExerciseUpdateForm />} />
          </Routes>
        </main>
        </TokenContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
