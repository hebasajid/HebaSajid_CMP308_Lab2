//STUDENT MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const saltRounds = 10;

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentNumber: {
        type: String,
        required: true,
    } ,
	firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }, 
    program: {
        type: String,
        required: true,
    },
    favouriteTopic: {
        type: String,
        required: true,
    },
    technicalSkill:  {
        type: String,
        required: true,
    },

    email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
    
    password: {
		type: String,
        required: true,
		// validation password length. above 6 characters.
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	}
});


// hash the passwords before saving
studentSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
    this.password = hashedPassword;
})

module.exports = mongoose.model('Student', studentSchema);
