const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const courseController = require("./controllers/course/courseController");
const quizController = require("./controllers/user/userQuizController");
const authController = require("./controllers/auth/authController");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

// Configure CORS to only allow requests from http://localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions)); // Apply CORS with specific options
app.use(bodyParser.json());

// Admin route
app.post("/admin/create-course", authMiddleware, courseController.createCourse);

// Endpoint to generate JWT
app.post("/auth", authController.adminVerification);

app.get("/api/courses", courseController.getCourses);
app.get("/api/course/:courseName", courseController.getCourseDetails);

app.post("/check_answers/:courseName", quizController.checkAnswers);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
