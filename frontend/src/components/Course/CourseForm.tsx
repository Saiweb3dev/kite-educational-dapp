"use client"
import React, { useState } from 'react';
import { QuizOption, FormData, CourseFormProps } from '../../../types/Course';

// CourseForm component
const Form: React.FC<CourseFormProps> = ({ onSubmit }) => {
    // State hooks for form fields
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [quizzes, setQuizzes] = useState<Array<{ id: number; question: string; options: Array<QuizOption>; answer?: string }>>([
        { id: 0, question: '', options: [], answer: '' },
    ]);
    const [lastUsedId, setLastUsedId] = useState<number>(0);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FormData = { title, description, courseName, imageUrl, link, quizzes };
        onSubmit(formData);
    };

    // Add a new quiz
    const addQuiz = () => {
        setLastUsedId(prevId => prevId + 1);
        setQuizzes([...quizzes, { id: lastUsedId + 1, question: '', options: [] }]);
    };

    // Remove a quiz by index
    const removeQuiz = (indexToRemove: number) => {
        setQuizzes(quizzes.filter((_, index) => index !== indexToRemove));
    };

    // Add an option to a quiz
    const addQuizOption = (quizIndex: number) => {
        if (quizzes[quizIndex].options.length >= 4) {
            alert("Each quiz can have up to 4 options.");
            return;
        }
        setQuizzes(quizzes.map((quiz, index) => 
            index === quizIndex ? { ...quiz, options: [...quiz.options, { text: '', correct: false }] } : quiz
        ));
    };

    // Update quiz question
    const updateQuizQuestion = (index: number, value: string) => {
        setQuizzes(quizzes.map((q, i) => i === index ? { ...q, question: value } : q));
    };

    // Update quiz option
    const updateQuizOption = (quizIndex: number, optIndex: number, value: string) => {
        setQuizzes(quizzes.map((q, i) => i === quizIndex ? 
            { ...q, options: q.options.map((o, idx) => idx === optIndex ? { ...o, text: value } : o) } : q
        ));
    };

    // Update quiz answer
    const updateQuizAnswer = (quizId: number, value: string) => {
        setQuizzes(quizzes.map(q => q.id === quizId ? { ...q, answer: value } : q));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-blue-700 p-4">
            {/* Basic course information inputs */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="block w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mb-2"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="block w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mb-2"
            ></textarea>
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                required
                className="block w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mb-2"
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
                className="block w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mb-2"
            />
            <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Link"
                required
                className="block w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mb-2"
            />

            {/* Quiz section */}
            {quizzes.map((quiz, index) => (
                <div key={index} className="space-y-2">
                    {/* Quiz question input */}
                    <input
                        type="text"
                        value={quiz.question}
                        onChange={(e) => updateQuizQuestion(index, e.target.value)}
                        placeholder="Quiz Question"
                        required
                        className="w-full text-white bg-transparent border-b-2 border-white outline-none p-2"
                    />
                    {/* Quiz options inputs */}
                    {quiz.options.map((option, optIndex) => (
                        <input
                            key={optIndex}
                            type="text"
                            value={option.text}
                            onChange={(e) => updateQuizOption(index, optIndex, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(optIndex + 65)}`}
                            required
                            className="w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mt-2"
                        />
                    ))}
                    {/* Quiz answer input (only shown when 4 options are present) */}
                    {quiz.options.length === 4 && (
                        <input
                            type="text"
                            value={quiz.answer || ''}
                            onChange={(e) => updateQuizAnswer(quiz.id, e.target.value)}
                            placeholder="Quiz Answer"
                            required
                            className="w-full text-white bg-transparent border-b-2 border-white outline-none p-2 mt-2"
                        />
                    )}
                    {/* Quiz control buttons */}
                    <div className="flex justify-between mt-2">
                        <button onClick={() => addQuizOption(index)} className="bg-white text-blue-700 px-4 py-2 rounded">Add Option</button>
                        <button onClick={() => removeQuiz(index)} className="bg-red-500 text-white px-4 py-2 rounded">Remove Quiz</button>
                    </div>
                </div>
            ))}

            {/* Add new quiz button */}
            <button onClick={() => addQuiz()} className="bg-white text-blue-700 px-4 py-2 rounded mt-4">Add New Quiz</button>

            {/* Form submit button */}
            <button type="submit" className="w-full bg-white text-blue-700 px-4 py-2 rounded mt-4">Submit</button>
        </form>
    );
};

export default Form;