import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components


//AddCourse mutation
const ADD_COURSE = gql`
  mutation AddCourse($courseCode: String!, $courseName: String!, $section: String!, $semester: String!) {
    addCourse(courseCode: $courseCode, courseName: $courseName, section: $section, semester: $semester) {
      courseCode
    }
  }
`;

// AddCourse component
const AddCourse = () => {
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [section, setSection] = useState('');
    const [semester, setSemester] = useState('');
    const navigate = useNavigate();
    const [addCourse] = useMutation(ADD_COURSE);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addCourse({ variables: { courseCode, courseName, section, semester } });
        // Clear input fields
        setCourseCode('');
        setCourseName('');
        setSection('');
        setSemester('');
        navigate('/listcourses');
      } catch (err) {
        console.error('Error creating course:', err);
        // Handle the error, e.g., show an error message to the user.
      }
    };

    // AddArticle component UI with React Bootstrap components
  return (
    <div>
      <h2>Create Course</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Course Code:</Form.Label>
          <Form.Control type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Course Name:</Form.Label>
          <Form.Control type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Section:</Form.Label>
          <Form.Control type="text" value={section} onChange={(e) => setSection(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Semester:</Form.Label>
          <Form.Control type="text" value={semester} onChange={(e) => setSemester(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Course
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;