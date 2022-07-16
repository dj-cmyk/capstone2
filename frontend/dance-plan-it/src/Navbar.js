import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
// import UserContext from './UserContext';
import "./Navbar.css";

function NavBar() {
//   const user = useContext(UserContext)

  
    // if (user) {
        return(
          <Navbar expand="md" className="NavBar" >
            <NavLink to="/" className="navbar-brand btn outline-secondary">
              Dance-Plan-It
            </NavLink>

            <Nav className="ml-auto NavBar" navbar>
              <NavItem>
                <NavLink to="/exercises" className="btn outline-secondary btn-sm">Exercises</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/lessonPlans" className="btn outline-secondary btn-sm">Lesson Plan Overviews</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/classes/2" className="btn outline-secondary btn-sm">ClassExercises</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink to="/" onClick={logout} className="btn outline-secondary btn-sm">Logout {user.firstName}</NavLink>
              </NavItem> */}
            </Nav>
          </Navbar>
        )
    // } else {
    //   return(
    //     <Navbar expand="md" className="NavBar" >
    //       <NavLink exact to="/" className="navbar-brand btn outline-secondary">
    //         Jobly
    //       </NavLink>
  
    //       <Nav className="ml-auto" navbar>
    //         <NavItem>
    //           <NavLink to="/login" className="btn outline-secondary btn-sm">Login</NavLink>
    //         </NavItem>
    //         <NavItem>
    //           <NavLink to="/signup" className="btn outline-secondary btn-sm">Sign Up</NavLink>
    //         </NavItem>
    //       </Nav>
    //     </Navbar>
    //   )
    // }
    
}


export default NavBar;