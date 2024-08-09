class CourseModel {
  constructor(name, imageUrl, link, quizzes) {
      this.name = name;
      this.imageUrl = imageUrl;
      this.link = link;
      this.quizzes = quizzes || [];
  }

  save() {
    const filePath = path.join(__dirname, '..', 'data', 'courseData', `${this.name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(this, null, 2));
  }

  static loadByName(name) {
    const filePath = path.join(__dirname, '..', 'data', 'courseData', `${name}.json`);
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath);
        return JSON.parse(rawData);
    }
    return null;
  }
}

module.exports = CourseModel;
