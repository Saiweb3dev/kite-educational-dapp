const fs = require('fs').promises;
const path = require('path');

exports.checkAnswers = async (req, res) => {
  try {
    // Extract course name from URL parameters
    const { courseName } = req.params;

    // Extract answers and address from request body
    const { answers, address } = req.body;

    // Construct file path for course data
    const directoryPath = path.join(__dirname, '..', '..', 'data', 'courseData');
    const filePath = path.join(directoryPath, `${courseName}.json`);

    // Log basic request information for debugging purposes
    console.log("Course name --> ", courseName);
    console.log("filePath --> ", filePath);
    console.log("Received answers --> ", answers);
    console.log("received address --> ", address);

    // Check if the course data file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error("File access error:", error);
      return res.status(404).send({ message: 'Course not found' });
    }

    // Read and parse the course data JSON file
    let fileContent;
    try {
      fileContent = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error("File read error:", error);
      return res.status(500).send({ message: 'Failed to read course data' });
    }

    const courseData = JSON.parse(fileContent);

    // Initialize correct answer count
    let correctCount = 0;

    // Get total number of quizzes/questions
    const totalQuestions = courseData.quizzes.length;

    // Log quizzes and answers for debugging
    console.log("quizzes --> ", courseData.quizzes);
    console.log("answers --> ", answers);

    // Ensure answers is an array and has elements before attempting comparison
    if (!Array.isArray(answers) || !answers.length) {
      console.log("No answers provided or incorrect format");
      return res.status(400).send({ message: 'No answers provided or incorrect format' });
    }

    // Compare each answer to the corresponding quiz's answer
    courseData.quizzes.forEach((quiz, index) => {
      // Ensure there is an answer for this quiz
      if (!answers[index]) return;

      // Extract selected option from the answer object
      const selectedOption = answers[index].selectedOption;

      // Compare the selected option to the quiz's answer
      if (selectedOption === quiz.answer) {
        correctCount++;
      }
    });

    // Prepare result object
    const result = {
      address: address,
      correct_answers: correctCount,
      total_questions: totalQuestions
    };

    // Send response back to client
    console.log("Response sent ---> ", result);
    res.send(result);
  } catch (error) {
    // Catch-all error handler
    console.error("Error ------------------------------", error);
    res.status(500).send({ message: 'An unexpected error occurred' });
  }
};
