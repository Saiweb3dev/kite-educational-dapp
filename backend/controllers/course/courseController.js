const CourseModel = require('../../models/course/CourseModel');
const path = require('path');
const {fileAccessFunc} = require("../../utils/fileAccessFunc")
exports.createCourse = async (req, res) => {
  try {
    console.log("Calling createCourse from course controller")
      const courseData = req.body;
      console.log("Received data --> ",courseData)
      // Basic validation example
      if (!courseData.courseName || !courseData.imageUrl || !courseData.link) {
          return res.status(400).send({ message: 'Missing required fields' });
      }
      console.log("calling course model")
      const course = new CourseModel(courseData.courseName, courseData.imageUrl, courseData.link, courseData.quizzes);
      await course.save();
      res.status(201).send({ message: 'Course created successfully' });
  } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).send({ message: 'Error creating course', error });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
      console.log("Calling getCourseDetails from course controller");
      const directoryPath = path.join(__dirname, '..', '..', 'data', 'courseData');
      console.log("directoryPath --> ", directoryPath);
      
      // Call the readJsonFiles function
      const courses = await fileAccessFunc(directoryPath);
      console.log("Response sent ---> ", courses);
      res.send(courses);
  } catch (error) {
    console.log("Error ------------------------------")
      console.error(error);
      res.status(500).send({ message: 'An error occurred' });
  }
};



