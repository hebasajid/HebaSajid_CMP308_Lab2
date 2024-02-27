import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import EditCourse from '../components/EditCourse';
import DeleteCourse from '../components/DeleteCourse';
import { Table } from 'react-bootstrap';

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const ListCourses = () => {
    const { loading, error, data, refetch } = useQuery(GET_COURSES);
    const [selectedCourse, setSelectedCourse] = useState(null);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const handleRowClick = (courseId) => {
      setSelectedCourse(courseId);
    };
  
    return (
        <div>
          <h2>List of Courses</h2>
          <Table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map((course, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(course.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.section}</td>
                  <td>{course.semester}</td>              
                </tr>
              ))}
            </tbody>
          </Table>
    
          {selectedCourse && (
      <div>
        <h2>Edit Course</h2>
        <br></br>
        <EditCourse
          courseId={selectedCourse}
          existingContent={data.courses.find((course) => course.id === selectedCourse).content}
          onClose={() => setSelectedCourse(null)}
          />
          <br></br>
        <h2>Delete Course</h2>
        <DeleteCourse
          courseId={selectedCourse}
          existingContent={data.courses.find((course) => course.id === selectedCourse).content}
          onClose={() => setSelectedCourse(null)}

        />
      </div>
      
      
    )}
    
          <button onClick={() => refetch()}>Refetch</button>
        </div>
      );
    };
    
    export default ListCourses;