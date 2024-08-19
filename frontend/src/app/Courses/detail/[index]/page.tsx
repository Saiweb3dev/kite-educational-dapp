// Import necessary modules and components
"use client"; // Indicates that this file is intended to run on the client side
import Loader from "@/components/Loader"; // Imports a loading component
import axios from "axios"; // Imports axios for making HTTP requests
import { useParams, useRouter } from "next/navigation"; // Imports hooks for routing in Next.js
import React, { useEffect, useState } from "react"; // Imports React and hooks for managing state and effects
import { useAccount } from "wagmi"; // Imports a hook for getting account details from wagmi
import { CourseDetails } from "../../../../../types/UserCourse"; // Imports type definitions

const CourseDetailPage: React.FC = () => {
  const router = useRouter(); // Hook to access the Next.js router
  const params = useParams(); // Hook to get URL parameters
  const name = params.index as string; // Extracts the course name from URL parameters
  const { address }: any = useAccount(); // Gets the user's account address using wagmi

  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null); // State to store course details
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [error, setError] = useState<string | null>(null); // State to store any errors

  const [courseViewed, setCourseViewed] = useState(false); // State to track if the course has been viewed

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true); // Sets loading to true before fetching data
        const response = await axios.get(`http://localhost:8080/api/course/${name}`); // Fetches course details from API
        const courseDetailsFromApi = response.data;
        console.log("courseDetailsFromApi --> ",response.data)
         // Extracts course details from the response
        setCourseDetails(courseDetailsFromApi); // Updates state with fetched details
        localStorage.setItem("courseDetails", JSON.stringify(courseDetailsFromApi)); // Stores course details in local storage
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Sets error message if fetching fails
      } finally {
        setLoading(false); // Sets loading to false after fetching data or encountering an error
      }
    };

    fetchCourseDetails(); // Calls the function to fetch course details
  }, [name]); // Dependency array ensures effect runs only when 'name' changes

  if (loading) return <Loader />; // Renders loader component while data is being fetched
  if (error) return <div>Error: {error}</div>; // Renders error message if an error occurs
  if (!courseDetails) return <div>No course details found.</div>; // Renders message if no course details are found

  return (
    <div className="container max-w-full h-screen p-4 bg-white text-black">
      {/* Course details display */}
      <div className="flex flex-col justify-center items-center mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4">{courseDetails.name}</h1> {/* Displays course name */}
        <img src={courseDetails.imageUrl} alt={courseDetails.name} className="mb-4 rounded-lg shadow-lg" /> {/* Displays course image */}
        <a href={courseDetails.link} target="_blank"> {/* Link to view video */}
          <button onClick={() => setCourseViewed(true)} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            View Video {/* Button to view video */}
          </button>
        </a>
        <p className="text-lg">{courseDetails.description}</p> {/* Displays course description */}

        {courseViewed && (
          <button onClick={() => router.push(`${name}/quiz?address=${address}`)} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Attend Quiz {/* Button to attend quiz, shown after viewing the video */}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
