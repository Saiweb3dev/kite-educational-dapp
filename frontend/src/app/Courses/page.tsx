"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface Quiz {
  id: number;
  question: string;
  options: QuizOption[];
  answer: string;
}

interface Course {
  name: string;
  imageUrl: string;
  link: string;
  quizzes: Quiz[];
}

const CourseCard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("API request sent to get courses");
      const response = await axios.get<Course[]>('http://localhost:8080/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  return (
    <div className="course-cards">
      {courses.map((course, index) => (
        <div key={index} className="course-card p-4 m-2 w-80 rounded shadow-md">
          <h2 className="font-bold text-xl mb-2">{course.name}</h2>
          <img className="w-full h-auto mb-2" src={course.imageUrl} alt={course.name} />
          <a href={course.link} className="underline">Learn More</a>
          <ul className="list-disc pl-5 mt-2">
            {course.quizzes.map((quiz, quizIndex) => (
              <li key={quizIndex}>
                {quiz.question}: {quiz.options.find(option => option.correct)?.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
