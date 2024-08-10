const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const courseController = require('./controllers/course/courseController')

const app = express();
const port = 8080;

// Configure CORS to only allow requests from http://localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions)); // Apply CORS with specific options
app.use(bodyParser.json());

// Admin route
app.post('/admin/create-course',
    /* authMiddleware */
      courseController.createCourse);

app.get('/api/courses',courseController.getCourseDetails)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
