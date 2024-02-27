const Student = require('../models/student.server.model.js');

  // Student resolvers
  const updateStudent = async (parent, args) => {
    console.log('args in update student:', args);
    try {
      const { id, ...update } = args;
      const options = { new: true };
      let student = await Student.findByIdAndUpdate(id, update, options);

      if (!student) {
        throw new Error(`User with ID ${id} not found`);
      }

      // Explicitly call save to trigger the pre-save hook
      student = await student.save();

      return student;
    } catch (error) {
      console.error('Error updating student:', error);
      throw new Error('Failed to update student');
    }
  };

  const deleteCourse = async (root, params) => {
    try {
      const deleteCourse = await Course.findOneAndRemove({ courseCode: params.courseCode }).exec();
  
      if (!deleteCourse) {
        throw new Error(`Course with course code ${params.courseCode} not found`);
      }
  
      return deleteCourse;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error('Failed to delete course');
    }
  };

  // Export resolvers
  module.exports = {
    updateStudent,
    deleteCourse,
  };