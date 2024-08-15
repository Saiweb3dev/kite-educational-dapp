// Import necessary modules and components
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import {
  CheckAnswersResponse,
  CourseDetails,
} from "../../../../../types/UserCourse";
import QuizMainComponent from "@/components/UserCourse/QuizMainComponent"; // Import QuizMainComponent
import QuizResultModal from "@/components/UserCourse/QuizResultModal";
import Loader from "@/components/Loader";

const CourseDetailPage: React.FC = () => {
  const params = useParams();
  const name = params.index as string;
  const { address }: any = useAccount();

  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizProgress, setQuizProgress] = useState({
    currentIndex: 0,
    isCompleted: false,
  });
  const [showQuiz, setShowQuiz] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState<Array<{ questionId: number; selectedOption: string }>>([]);
  const [quizResult, setQuizResult] = useState<CheckAnswersResponse | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/course/${name}`);
        setCourseDetails(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [name]);

  useEffect(() => {
    if (quizProgress.isCompleted) {
      setIsModalOpen(true);
    }
  }, [quizProgress.isCompleted]);

  if (loading) return <Loader/>;
  if (error) return <div>Error: {error}</div>;
  if (!courseDetails) return <div>No course details found.</div>;

  return (
    <div className="container mx-auto h-screen p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">{courseDetails.name}</h1>
      <img src={courseDetails.imageUrl} alt={courseDetails.name} className="mb-4 rounded-lg shadow-lg" />
      <p className="text-lg">{courseDetails.description}</p>

      {!showQuiz && (
        <button
          onClick={() => setShowQuiz(true)} // Toggle the showQuiz state to true
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Attend Quiz
        </button>
      )}

      {/* Conditional Rendering for QuizMainComponent */}
      {showQuiz && courseDetails?.quizzes.length > 0 && (
  <QuizMainComponent
    courseDetailsProp={courseDetails}
    address={address}
  />
)}


      {/* Modal for quiz result */}
      {quizProgress.isCompleted && isModalOpen && quizResult && (
        <QuizResultModal
          quizResult={quizResult}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CourseDetailPage;
