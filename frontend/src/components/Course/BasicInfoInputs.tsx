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
        <>
    {/* Labelled input for the title. */}
    <label htmlFor="title" className="form-control w-full max-w-xs">
        <span className='label label-text'>Enter the title</span>
        <input
            type="text"
            id="title"
            value={formState.title}
            onChange={(e) => updateBasicInfo('title', e.target.value)}
            placeholder="Title"
            required
            className="input input-bordered input-primary w-full max-w-xs"
        />
    </label>

    {/* Labelled textarea for the course description. */}
    <label htmlFor="description" className="form-control w-full max-w-xs">
        <span className='label label-text'>Description</span>
        <textarea
            id="description"
            value={formState.description}
            onChange={(e) => updateBasicInfo('description', e.target.value)}
            placeholder="Description"
            required
            className="input input-bordered input-primary w-full max-w-xs"
        ></textarea>
    </label>

    {/* Labelled input field for the course name. */}
    <label htmlFor="courseName" className="form-control w-full max-w-xs">
        <span className='label label-text'>Course Name</span>
        <input
            type="text"
            id="courseName"
            value={formState.courseName}
            onChange={(e) => updateBasicInfo('courseName', e.target.value)}
            placeholder="Course Name"
            required
            className="input input-bordered input-primary w-full max-w-xs"
        />
    </label>

    {/* Labelled input field for the course image URL. */}
    <label htmlFor="imageUrl" className="form-control w-full max-w-xs">
        <span className='label label-text'>Image URL</span>
        <input
            type="text"
            id="imageUrl"
            value={formState.imageUrl}
            onChange={(e) => updateBasicInfo('imageUrl', e.target.value)}
            placeholder="Image URL"
            required
            className="input input-bordered input-primary w-full max-w-xs"
        />
    </label>

    {/* Labelled input field for the course link. */}
    <label htmlFor="link" className="form-control w-full max-w-xs">
        <span className='label label-text'>Link</span>
        <input
            type="text"
            id="link"
            value={formState.link}
            onChange={(e) => updateBasicInfo('link', e.target.value)}
            placeholder="Link"
            required
            className="input input-bordered input-primary w-full max-w-xs"
        />
    </label>
</>

    );
};


export default BasicInfoInputs;