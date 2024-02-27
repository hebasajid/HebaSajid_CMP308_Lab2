//COURSE MODEL
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: {
     type:   String,
     required: true,
    },
	courseName: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    semester: {
        type: String, 
        required: true,
    },
    
    studentId: {
		type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',	
        required: true,
	},
});

const CourseModel = mongoose.model('Course', courseSchema)

module.exports = CourseModel
