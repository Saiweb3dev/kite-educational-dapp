"use client"
// Custom hooks
import useFormState from '@/hooks/useFormState';

// Standard library
import React from 'react';

// Third-party libraries
import { CourseFormProps } from '../../../types/Course';
import BasicInfoInputs from './BasicInfoInputs';
import QuizSection from './QuizSection';


/**
 * Form component for creating or editing course details.
 * It uses a custom hook (`useFormState`) to manage form state and actions.
 *
 * @component
 * @param {CourseFormProps} props - Props required for the form, including submission handler.
 */
const Form: React.FC<CourseFormProps> = ({ onSubmit }) => {
  // Destructure necessary properties and functions from the useFormState hook.
  const { 
      formState, // Contains current form values and states (e.g., quizzes).
      updateBasicInfo, // Function to update basic info fields.
      quizActions, // Actions related to quizzes (e.g., add/remove questions).
      handleSubmit // Handler for form submission.
  } = useFormState(onSubmit);

  // Render the form with inputs for basic info and quizzes.
  return (
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4 bg-blue-700 p-4 rounded-lg">
          {/* Inputs for basic course information */}
          <BasicInfoInputs formState={formState} updateBasicInfo={updateBasicInfo} />

          {/* Section for managing quizzes associated with the course */}
          <QuizSection quizzes={formState.quizzes} quizActions={quizActions} />

          {/* Submit button for the form */}
          <button type="submit" className="btn btn-xs bg-blue-700 hover:bg-blue-500 border-2 border-white text-white sm:btn-sm md:btn-md lg:btn-lg">Submit</button>
      </form>
  );
};


export default Form;