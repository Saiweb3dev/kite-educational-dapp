const CourseModel = require('../../models/course/CourseModel');
exports.createCourse = async (req, res) => {
  try {
      const courseData = req.body;
      const course = new CourseModel(courseData.courseName, courseData.imageUrl, courseData.link, courseData.quizzes);

      await course.save(); // Assuming save method is implemented
      res.status(201).send({ message: 'Course created successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error creating course', error });
  }
};
