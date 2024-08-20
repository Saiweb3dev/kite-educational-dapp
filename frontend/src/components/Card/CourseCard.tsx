import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component for optimized images

interface CourseProps {
  name: string;
  imageUrl: string;
  link: string;
  index: number;
}

const CourseCard: React.FC<CourseProps> = ({ name, imageUrl, link, index }) => {
  const dynamicRoutePath = `/Courses/detail/${name}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate" title={name}>
          {name}
        </h2>
        <Link href={dynamicRoutePath} passHref>
          <span className="inline-block bg-blue-600 text-white rounded-full px-4 py-2 mt-4 hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer">
            View Course
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;