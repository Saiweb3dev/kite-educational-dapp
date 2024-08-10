import React from 'react';
import Link from 'next/link'; // Import Link from next/router for client-side navigation

// Define the expected shape of the props
interface CourseProps {
  name: string;
  imageUrl: string;
  link: string; // Assuming this is now the base URL for the course details page
  index: number; // Add an index prop to generate dynamic routes
}

const CourseCard: React.FC<CourseProps> = ({ name, imageUrl, link, index }) => {
  // Construct the dynamic route path
  const dynamicRoutePath = `/Courses/detail/${name}`;

  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-4 m-2 h-64 w-64 border shadow-blue-300 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold mb-2 text-blue-600">{name}</h2>
      <img className="w-full h-auto mb-2" src={imageUrl} alt={name} />
      <Link href={dynamicRoutePath} passHref>
        <span className="inline-block bg-blue-700 text-white rounded-full px-4 py-2 hover:text-blue-700">View Course</span>
      </Link>
    </div>
  );
};

export default CourseCard;
