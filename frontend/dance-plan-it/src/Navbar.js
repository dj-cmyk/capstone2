import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./Navbar.css";

function NavBar() {
        return(
          <Navbar expand="md" className="NavBar" >
            <NavLink to="/" className="navbar-brand btn outline-secondary">
              Dance-Plan-It
            </NavLink>

            <Nav className="ml-auto NavBar" navbar>
              <NavItem>
                <NavLink to="/exercises" className="btn outline-secondary btn-sm">All Exercises</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/lessonPlans" className="btn outline-secondary btn-sm">All Lesson Plans</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/classes/new" className="btn outline-secondary btn-sm">ClassEx Form</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        )
    
}


export default NavBar;