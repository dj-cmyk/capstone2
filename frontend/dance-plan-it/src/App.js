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
import axios from 'axios';



const code = new URLSearchParams(window.location.search).get("code")
const BASE_URL = "http://localhost:3001"

function App() {

  const addNewExercise = async (exerciseFormData) => {
    let res = await axios.post(`${BASE_URL}/exercises/`, ({...exerciseFormData}))
    return res
  }

  const addNewLessonPlan = async (lessonPlanFormData) => {
    let res = await axios.post(`${BASE_URL}/lessonPlans/`, ({...lessonPlanFormData}))
    return res
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            { code ? <Route path="/" element={<Dashboard />} /> : <Route path="/" element={<Home />} />}
            
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/exercises/new" element={<ExerciseForm addNewExercise={addNewExercise}/>} />
            <Route path="/lessonPlans" element={<LessonPlan />} />
            <Route path="/lessonPlans/new" element={<LessonPlanForm addNewLessonPlan={addNewLessonPlan}/>} />
            <Route path="/classes/:id" element={<ClassExercises code={code}/>} />
            
            {/* <ProtectedRoute 
              exact 
              path="/companies/:handle" 
              render={({ match }) => <CompanyDetail handle={match.params.handle} />}
            /> */}

            {/* <ProtectedRoute exact path="/jobs">
              <JobList />
            </ProtectedRoute> */}
            {/* <Route exact path="/login">
              <LoginForm login={login}/>
            </Route> */}
            {/* <Route exact path="/signup">
              <SignUpForm signup={signup} />
            </Route> */}
            {/* <ProtectedRoute exact path="/profile">
              <Profile update={update}/>
            </ProtectedRoute> */}
            
          </Routes>
        </main>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
