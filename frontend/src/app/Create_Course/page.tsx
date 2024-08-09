"use client"
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import Form from '@/components/Course/CourseForm';

interface CourseData {
  title: string;
  description: string;
  // Include other fields as necessary
}


type AdminAddress = string; // Simplified for demonstration; consider using a more complex type if needed

const CreateCoursePage: React.FC = () => {
    const { address } = useAccount();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        // List of admin addresses - replace with actual admin addresses
        const adminAddresses: AdminAddress[] = ['0xC2F20D5c81F5B4450aA9cE62638d0bB01DF1935a', '0x456...'];

        // Check if the connected wallet address is an admin
        setIsAdmin(adminAddresses.includes(address as AdminAddress));
    }, [address]);

    const handleSubmit = async (courseData: CourseData) => {
        if (!isAdmin) {
            alert('Only admins can create courses.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/admin/create-course', courseData);
            alert('Course created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create course.');
        }
    };

    // Render form or loading indicator based on admin status
    if (!isAdmin) {
        return <div>Please connect a wallet with admin permissions.</div>;
    }

    return (
        <div>
            <h1>Create a New Course</h1>
            <Form onSubmit={handleSubmit}/>
        </div>
    );
};

export default CreateCoursePage;
