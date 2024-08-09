const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const courseController = require('./controllers/course/courseController');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Admin route
app.post('/admin/create-course', authMiddleware, courseController.createCourse);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
