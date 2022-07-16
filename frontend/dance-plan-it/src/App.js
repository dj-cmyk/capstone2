import './App.css';
import ExerciseList from './ExerciseList';
import NavBar from './Navbar';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import LessonPlan from './LessonPlans';
import Dashboard from './Dashboard';
import ClassExercises from './ClassExercises';



const code = new URLSearchParams(window.location.search).get("code")

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            { code ? <Route path="/" element={<Dashboard />} /> : <Route path="/" element={<Home />} />}
            
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/lessonPlans" element={<LessonPlan />} />
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
