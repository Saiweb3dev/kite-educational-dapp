"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '@/components/Card/CourseCard';
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

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("API request sent to get courses");
      const response = await axios.get<Course[]>('http://localhost:8080/api/courses');
      console.log("Response from server --> ",response.data)
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  return (
    <div className='bg-white container max-w-full'>
    <div className=" mx-auto h-screen px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} index={index} {...course} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Courses;
