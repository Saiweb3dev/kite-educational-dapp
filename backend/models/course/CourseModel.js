const fs = require('fs').promises; // Note the change here
const path = require('path');

class CourseModel {
  constructor(name, imageUrl, link, quizzes) {
      this.name = name;
      this.imageUrl = imageUrl;
      this.link = link;
      this.quizzes = quizzes || [];
  }

  async save() {
    const filePath = path.join(__dirname, '..','..', 'data', 'courseData', `${this.name}.json`);
    await fs.writeFile(filePath, JSON.stringify(this, null, 2));
  }

  static async loadByName(name) {
    const filePath = path.join(__dirname, '..', 'data', 'courseData', `${name}.json`);
    try {
        await fs.access(filePath); // Check if file exists
        const rawData = await fs.readFile(filePath);
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Error loading course by name: ${name}`, error);
        return null;
    }
  }
}

module.exports = CourseModel;
