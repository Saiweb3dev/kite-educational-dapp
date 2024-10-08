const CourseModel = require("../../models/course/CourseModel");
const path = require("path");
const fs = require("fs").promises;
const { fileAccessFunc } = require("../../utils/fileAccessFunc");
const { pinJSONtoIPFS } = require("../../models/IPFS/pinataIpfsPinning");
exports.createCourse = async (req, res) => {
  try {
    console.log("Calling createCourse from course controller");
    const courseData = req.body;
    console.log("Received data --> ", courseData);
    // Basic validation example
    if (!courseData.courseName || !courseData.imageUrl || !courseData.link) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    const IpfsHash = await pinJSONtoIPFS(courseData);
    console.log("IpfsHash --> ", IpfsHash);

    res.status(201).send(IpfsHash);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send({ message: "Error creating course", error });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    console.log("Calling updateCourse from course controller");
    const courseData = req.body.combinedData; // Access the nested object
    console.log("Received data --> ", courseData);
    if (
      !courseData.courseName ||
      !courseData.imageUrl ||
      !courseData.link ||
      !courseData.courseId
    ) {
      console.log("Missing required fields");
      console.log(!courseData.courseName, !courseData.imageUrl, !courseData.link, !courseData.courseId);
      return res.status(400).send({ message: "Missing required fields" });
    }
    
    // Proceed to the next logic if all fields are present
    console.log("All required fields are present.");
    console.log("Calling course model");
    const course = new CourseModel(
      courseData.courseId,
      courseData.courseName,
      courseData.IpfsHash, // Assuming IpfsHash is defined elsewhere
      courseData.imageUrl,
      courseData.link,
      courseData.quizzes
    );
    await course.save();
    res.status(201).send({ courseId: courseData.courseId }); 
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send({ message: "Error creating course", error: error.message });
  }
};


exports.getCourses = async (req, res) => {
  try {
    console.log("Calling getCourses from course controller");
    const directoryPath = path.join(
      __dirname,
      "..",
      "..",
      "data",
      "courseData"
    );
    console.log("directoryPath --> ", directoryPath);

    // Call the readJsonFiles function
    const courses = await fileAccessFunc(directoryPath);
    console.log("Response sent ---> ", courses);
    res.send(courses);
  } catch (error) {
    console.log("Error ------------------------------");
    console.error(error);
    res.status(500).send({ message: "An error occurred" });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    console.log("Calling getCourseDetails from course controller");
    const { courseName } = req.params; // Get the course name from the URL parameter
    const directoryPath = path.join(
      __dirname,
      "..",
      "..",
      "data",
      "courseData"
    );
    const filePath = path.join(directoryPath, `${courseName}.json`);

    console.log("Course name --> ", courseName);
    console.log("filePath --> ", filePath);

    // Check if the file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      console.log("File not found");
      return res.status(404).send({ message: "Course not found" });
    }

    // Read and parse the JSON file
    const fileContent = await fs.readFile(filePath, "utf8");
    const courseData = JSON.parse(fileContent);

    console.log("Response sent ---> ", courseData);
    res.send(courseData);
  } catch (error) {
    console.log("Error ------------------------------");
    console.error(error);
    res.status(500).send({ message: "An error occurred" });
  }
};
