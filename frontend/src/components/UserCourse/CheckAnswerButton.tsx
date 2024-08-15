// Import necessary libraries and types
import React from 'react';
import axios from 'axios';
import { CheckAnswerButtonProps, CheckAnswersResponse } from '../../../types/UserCourse';

/**
 * Component for a button that allows users to check their answers against the correct ones.
 * It sends a POST request to the backend with the user's answers and their Ethereum address.
 * Upon receiving the response, it calls the provided callback function with the result.
 */
const CheckAnswerButton: React.FC<CheckAnswerButtonProps> = ({
  courseName,
  answers,
  onResultReceived,
  address
}) => {

  /**
   * Asynchronous function to send the user's answers to the server for verification.
   * Logs the call details, sends the request, and handles both success and error cases.
   */
  const checkAnswers = async () => {
    try {
      // Log the details of the request being sent
      console.log(`Calling server with address: ${address} and answers: ${JSON.stringify(answers)}`);

      // Send a POST request to the server with the course name, user's answers, and their Ethereum address
      const response = await axios.post<CheckAnswersResponse>(
        `http://localhost:8080/check_answers/${courseName}`,
        { answers, address }
      );

      // Call the provided callback function with the response data
      onResultReceived(response.data);
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Error checking answers:', error);
    }
  };

  /**
   * Renders the button that, when clicked, triggers the checkAnswers function.
   */
  return (
    <button 
      onClick={checkAnswers} // Attach the checkAnswers function to the button's click event
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Check Answer
    </button>
  );
};

export default CheckAnswerButton;
