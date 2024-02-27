// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	const db = mongoose.connect(config.db).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error in db connection', err);
		});

	// Load the 'student' model 
	require('../models/student.server.model');
	// Load the 'course' model
	require('../models/course.server.model');

	// Return the Mongoose connection instance
	return db;
};