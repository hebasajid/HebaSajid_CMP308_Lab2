import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// A delete mutation to delete a course given id 
const DELETE_COURSE = gql`
  mutation DeleteCourse($studentCourseCode: String!) {
    deleteCourse(courseCode: $studentCourseCode) {  
      id
    }
  }
`;

function DeleteCourse(props) {
    let navigate = useNavigate();
    let studentCourseCode;
    const [deleteCourse, { loading, error }] = useMutation(DELETE_COURSE); 
  
    if (loading) return <Spinner animation="border" />;
    if (error) return `Submission error! ${error.message}`;
  
    return (
      <div className="entryform">
        <h4>Delete Operation</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteCourse({ variables: { studentCourseCode: studentCourseCode.value } });
            studentCourseCode.value = '';
            navigate('/listcourses');
          }}
        >
          <Form.Group>
            <Form.Label>Course Code:</Form.Label>
            <Form.Control
              type="text"
              name="courseCode"
              ref={(node) => {
                studentCourseCode = node;
              }}
              placeholder="Course Code"
            />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Delete Course
          </Button>
        </form>
      </div>
    );
  }
  
  export default DeleteCourse;
  
