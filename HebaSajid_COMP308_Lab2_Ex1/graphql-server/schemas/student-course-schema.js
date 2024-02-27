//importing the resolvers for each operation:
const {updateStudent, deleteCourse} = require('../resolvers/student.server.resolvers');

//student-course-schema.js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
  } = require('graphql');

const StudentModel = require('../models/student.server.model')
const CourseModel = require('../models/course.server.model')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // generate this elsewhere
const jwtExpirySeconds = 300;

// Create a GraphQL Object Type for Student model
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type.

const studentType = new GraphQLObjectType({
    name: 'student',
    fields: function () {
      return {
        id: {
          type: GraphQLID // Unique identifier for the user (typically corresponds to MongoDB _id)
        },
        studentNumber: {
          type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        city: {
            type: GraphQLString,
        },
        phoneNumber: {
            type: GraphQLString,
        },
        program: {
            type: GraphQLString,
        },
        favouriteTopic: {
            type: GraphQLString,
        },
        technicalSkill: {
            type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      };
    },
  });

  // Create a GraphQL Object Type for Course model
  const courseType = new GraphQLObjectType({
    name: 'course',
    fields: function () {
      return {
        id: {
          type: GraphQLID // Unique identifier for the user (typically corresponds to MongoDB _id)
        },
        courseCode: {
          type: GraphQLString,
        },
        courseName: {
          type: GraphQLString,
        },
        section: {
          type: GraphQLString,
        },
        semester: {
            type: GraphQLString,
        },
        studentId: {
            type: GraphQLID,
        },
      };
    },
  });

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        students: {
          type: new GraphQLList(studentType),

          resolve: function () {
            const students = StudentModel.find().exec()
            if (!students) {
              throw new Error('Error')
            }
            return students
          }
        },
        student: {
            type: studentType,
            args: {
              id: {
                name: 'id',
                type: GraphQLString
              }
            },
            resolve: async function (root, params) {
                console.log('Executing student resolver with params:', params);
                try {
                  const studentInfo = await StudentModel.findById(params.id).exec();
                  console.log('Student info:', studentInfo);
      
                  if (!studentInfo) {
                    console.error('User not found for id:', params.id);
                    throw new Error('Error');
                  }
      
                  return studentInfo;
                } catch (error) {
                  console.error('Error fetching student:', error);
                  throw new Error('Failed to fetch student');
                }
              }
            },
            // check if user is logged in
        isLoggedIn: {
            type: GraphQLBoolean,  // Change the type to Boolean
            args: {
              email: {
                name: 'email',
                type: GraphQLString,
              },
            },
            resolve: function (root, params, context) {
              const token = context.req.cookies.token;
    
              // If the cookie is not set, return false
              if (!token) {
                return false;
              }
    
              try {
                // Try to verify the token
                jwt.verify(token, JWT_SECRET);
                return true;  // Token is valid, user is logged in
              } catch (e) {
                // If verification fails, return false
                return false;
              }
            },
          },
          // 
        courses: {
            type: new GraphQLList(courseType),
            resolve: function () {
              const courses = CourseModel.find().exec()
              if (!courses) {
                throw new Error('Error')
              } 
              return courses;
            },
          },

          course: {
            type: courseType,
            args: {
              id: {
                type: new GraphQLNonNull(GraphQLID),
              },
            },
            resolve: async function (root, { id }) {
              try {
                const course = await CourseModel.findById(id).exec();
    
                if (!course) {
                  throw new Error('Course not found');
                }
    
                return course;
              } catch (error) {
                console.error('Error fetching course:', error);
                throw new Error('Failed to fetch course');
              }
            },
          },
          
  
  
        };
      },
    });

    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: function () {
          return {
            createStudent: {
              type: studentType,
              args: {
                studentNumber: {
                  type: new GraphQLNonNull(GraphQLString),
                },
                firstName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                lastName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                address: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                city: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                phoneNumber: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                program: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                favouriteTopic: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                technicalSkill: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                email: {
                  type: new GraphQLNonNull(GraphQLString),
                },
                password: {
                  type: new GraphQLNonNull(GraphQLString),
                },
              },
              resolve: function (root, params, context) {
                const studentModel = new StudentModel(params);
                const newStudent = studentModel.save();
                if (!newStudent) {
                  throw new Error('Error');
                }
                return newStudent
              }
            },

            updateStudent: {
                type: studentType,
                args: {
                  id: {
                    name: 'id',
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  studentNumber: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  firstName: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  lastName: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  address: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  city: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  phoneNumber: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  favouriteTopic: {
                    type: new GraphQLNonNull(GraphQLString)
                  },
                  technicalSkill: {
                    type: new GraphQLNonNull(GraphQLString)
                  }, 
                  email: {
                    type: new GraphQLNonNull(GraphQLString)
                  }
                  
                  
                },
                resolve: updateStudent
              },
              loginStudent: {
                type: GraphQLBoolean,  // Change the type to Boolean
                args: {
                  email: {
                    name: 'email',
                    type: GraphQLString,
                  },
                  password: {
                    name: 'password',
                    type: GraphQLString,
                  },
                },
                resolve: async function (root, params, context) {
                    console.log('Executing loginStudent resolver with params:', params);
        
                    const studentInfo = await StudentModel.findOne({ email: params.email }).exec();
                    console.log('Student info:', studentInfo);
                    if (!studentInfo) {
                      console.error('Student not found for email:', params.email);
                      return false;  // Authentication failed
                    }
                    console.log('email: ', studentInfo.email)
                    console.log('entered pass: ',params.password)
                    console.log('hash: ', studentInfo.password)
                     // check if the password is correct
                    const isValidPassword = await bcrypt.compare(params.password.trim(), studentInfo.password);
                    console.log('bcrypt.compare Result: ', isValidPassword);
        
                    if (!isValidPassword) {
                      console.error('Invalid password');
                      console.log('Entered Password:', params.password);
                      console.log('Stored Password:', studentInfo.password);
                      return false;  // Authentication failed
                    }

                    try {
                        const token = jwt.sign(
                          { _id: studentInfo._id, email: studentInfo.email },
                          JWT_SECRET,
                          { algorithm: 'HS256', expiresIn: jwtExpirySeconds }
                        );
                      
                        console.log('Generated token:', token);
                      
                        context.res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
                        return true;  // Authentication successful
                      } catch (error) {
                        console.error('Error generating token:', error);
                        return false; // Authentication failed
                      }
                      
                    },
                  },

                  logOut: {
                    type: GraphQLString,
                    resolve: (parent, args, context) => {
                      context.res.clearCookie('token');
                      return 'Logged out successfully!';
                    },
                },
                addCourse: {
                    type: courseType,
                    args: {
                      courseCode: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      courseName: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      section: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                      semester: {
                        type: new GraphQLNonNull(GraphQLString),
                      },
                    },
                    resolve: async function (root, { courseCode, courseName, section, semester }, context) {
                      // Check if the user is logged in
                      const token = context.req.cookies.token;
                  
                      if (!token) {
                        throw new Error('Student not authenticated');
                      }

                      try {
                        // Verify the token to get the student ID
                        const decodedToken = jwt.verify(token, JWT_SECRET);
                        const studentId = decodedToken._id;
                  
                        // Continue with adding the course, including the studentId
                        const courseModel = new CourseModel({ courseCode, courseName, section, semester, studentId });
                        const savedCourse = await courseModel.save();
                  
                        return savedCourse;
                      } catch (error) {
                        console.error('Error adding course:', error);
                        throw new Error('Failed to add course');
                      }
                    },
                  },

                  editCourse: {
                    type: courseType,
                    args: {
                      id: { type: new GraphQLNonNull(GraphQLID) },
                      section: { type: new GraphQLNonNull(GraphQLString) }, 
                    },
                    resolve: async function (root, { id, section }, context) { 
                      const token = context.req.cookies.token;
                      if (!token) {
                        return 'not-auth';
                      }
                  
                      try {
                        // Get the user ID from the token
                        const { _id: studentId2 } = jwt.verify(token, JWT_SECRET);
                        
                        // Find the course by ID
                        const course = await CourseModel.findById(id).exec();
                  
                        // Check if the user making the edit is the author of the course
                        if (!course || String(course.studentId2) !== studentId2) {
                          throw new Error('Unauthorized');
                        }
                  
                        // Update the course section
                        course.section = section; // Update the section field with the new value
                        const updatedCourse = await course.save(); // Save the updated course
                  
                        return updatedCourse;
                      } catch (error) {
                        console.error('Error editing course:', error);
                        // Handle the error, e.g., show an error message to the user.
                        throw new Error('Failed to edit course');
                      }
                    },
                  },
                  
                  deleteCourse: {
                    type: courseType,
                    args: {
                      courseCode: { type: new GraphQLNonNull(GraphQLString) },
                    },
                    resolve: async function (root, { courseCode }) {
                      try {
                        const deletedCourse = await CourseModel.findOneAndDelete({ courseCode }).exec();
                        if (!deletedCourse) {
                          throw new Error('Course not found');
                        }
                        return deletedCourse;
                      } catch (error) {
                        console.error('Error deleting course:', error);
                        throw new Error('Failed to delete course');
                      }
                    },
                  },

                };
              },
            });
            module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });


