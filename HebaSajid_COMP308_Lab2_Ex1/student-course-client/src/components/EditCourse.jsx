// EditArticle component
import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const EDIT_COURSE = gql`
  mutation EditCourse($id: ID!, $section: String!) {
    editCourse(id: $id, section: $section) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const EditCourse = ({ courseId, existingSection, onClose }) => {
    const [section, setSection] = useState('');
  
    useEffect(() => {
      // Set the initial content when the component mounts
      setSection(existingSection);
    }, [existingSection]);
  
    const [editCourse] = useMutation(EDIT_COURSE);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await editCourse({ variables: { id: courseId, section } });
        onClose();
      } catch (err) {
        console.error('Error editing course section:', err);
        // Handle the error, e.g., show an error message to the user.
      }
    };

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Section:</label>
              <textarea value={section} onChange={(e) => setSection(e.target.value)} />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      );
    };
    
    export default EditCourse;