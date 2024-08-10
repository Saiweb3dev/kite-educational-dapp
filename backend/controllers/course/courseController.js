const CourseModel = require('../../models/course/CourseModel');
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

