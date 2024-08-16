// Standard library
import React from 'react';

// Types
import { FormData } from '../../../types/Course';


interface BasicInfoInputsProps {
    formState: FormData;
    updateBasicInfo: (field: keyof FormData, value: string) => void;
}

/**
 * Component responsible for rendering basic information inputs for a course.
 * Includes fields for title, description, course name, image URL, and link.
 *
 * @component
 * @param {BasicInfoInputsProps} props - Props containing the form state and a function to update basic info.
 */
const BasicInfoInputs: React.FC<BasicInfoInputsProps> = ({ formState, updateBasicInfo }) => {
    // Input field for the course title.
    return (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Information</h2>
  
  <div className="grid grid-cols-2 gap-6">
    {/* Left Column */}
    <div className="space-y-6">
      {/* Title input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formState.title}
          onChange={(e) => updateBasicInfo('title', e.target.value)}
          placeholder="Enter the course title"
          required
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Course Name input */}
      <div>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
          Course Name
        </label>
        <input
          type="text"
          id="courseName"
          value={formState.courseName}
          onChange={(e) => updateBasicInfo('courseName', e.target.value)}
          placeholder="Enter the course name"
          required
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Image URL input */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          value={formState.imageUrl}
          onChange={(e) => updateBasicInfo('imageUrl', e.target.value)}
          placeholder="Enter the image URL"
          required
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      {/* Description textarea */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={formState.description}
          onChange={(e) => updateBasicInfo('description', e.target.value)}
          placeholder="Enter course description"
          required
          rows={4}
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      {/* Link input */}
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
          Link
        </label>
        <input
          type="text"
          id="link"
          value={formState.link}
          onChange={(e) => updateBasicInfo('link', e.target.value)}
          placeholder="Enter the course link"
          required
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
</div>

    );
};


export default BasicInfoInputs;