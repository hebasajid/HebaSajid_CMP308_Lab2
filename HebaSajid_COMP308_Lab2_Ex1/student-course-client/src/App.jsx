import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

// Import components
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import LoginStudent from './components/LoginStudent';
import AddCourse from './components/AddCourse';
import EditStudent from './components/EditStudent';
import ListCourses from './components/ListCourses';
import CoursesHome from './components/CoursesHome';
import StudentList from './components/StudentList';
import EditCourse from './components/EditCourse';
import DeleteCourse from './components/DeleteCourse';
// App component
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            React Client For GraphQL API
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/createstudent">
                Sign Up Student
              </Nav.Link>
              <Nav.Link as={Link} to="/studentlist">
                Student List
              </Nav.Link>
              <Nav.Link as={Link} to="/addcourse">
                Add Course
              </Nav.Link>
              <Nav.Link as={Link} to="/listcourses">
                List Courses
              </Nav.Link>
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginStudent />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="createstudent" element={<AddStudent />} />
          <Route path = "editstudent/:id" element={<EditStudent />} />
          <Route path = "editcourse/:id" element={<EditCourse />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="listcourses" element={<ListCourses />} />
          <Route path="courseshome" element={<CoursesHome/>} />
          <Route path="deletecourse/:id" element={<DeleteCourse/>} />
        </Routes>
      </div>
    </Router>
  );
}
//
export default App;

