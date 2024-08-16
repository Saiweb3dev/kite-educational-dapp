"use client"
// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';

// Importing hooks from wagmi for interacting with Ethereum accounts and signing messages
import { useAccount, useSignMessage } from 'wagmi';

// Importing axios for making HTTP requests
import axios from 'axios';

// Importing ethers for Ethereum-related operations
import { ethers } from 'ethers';

// Importing a custom form component
import Form from "../../components/Course/Form"
import Loader from '@/components/Loader';

// Defining the structure of course data
interface CourseData {
  title: string;
  description: string;
}

// Type alias for admin addresses
type AdminAddress = string;

// Main component for creating a course
const CreateCoursePage: React.FC = () => {
    // Hook to get the connected account's address
    const { address } = useAccount();

    // State to track if the current user is an admin
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // Hook to sign messages
    const { signMessageAsync } = useSignMessage();

    // State to hold the authentication token
    const [token, setToken] = useState<string | null>(null);

    // Effect hook to check if the connected wallet address is an admin
    useEffect(() => {
        // List of admin addresses - replace with actual admin addresses
        const adminAddresses: AdminAddress[] = ['0xC2F20D5c81F5B4450aA9cE62638d0bB01DF1935a', '0x456...'];

        // Updating the isAdmin state based on whether the address is in the admin list
        setIsAdmin(adminAddresses.includes(address as AdminAddress));
    }, [address]);

    // Effect hook to authenticate the user if they are an admin
    useEffect(() => {
        if (isAdmin && address) {
            authenticate();
        }
    }, [isAdmin, address]);

    // Function to authenticate the user
    const authenticate = async () => {
        if (!address) return;

        const message = 'Sign this message to authenticate';
        try {
            const signature = await signMessageAsync({ message });
            const response = await axios.post('http://localhost:8080/auth', {
                signature,
                message: ethers.hexlify(ethers.toUtf8Bytes(message)),
                address
            });
            setToken(response.data.token);
        } catch (error) {
            console.error('Authentication failed', error);
        }
    };

    // Function to submit the course creation form
    const handleSubmit = async (courseData: CourseData) => {
        console.log("Calling handle submit ....")
        console.log("Sending Data --> ", courseData)

        // Only proceed if the user is an admin and has a valid token
        if (!isAdmin || !token) {
            alert('Only authenticated admins can create courses.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/admin/create-course', courseData, {
                headers: { 'Authorization': token }
            });
            alert('Course created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create course.');
        }
    };

    // Rendering logic based on the user's admin status and authentication token
    if (!isAdmin) {
        return (<div className="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-md">
        <p className="text-gray-800 text-lg mb-2">Please connect a wallet with admin permissions.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Connect Wallet</button>
      </div>
        )
      ;
    }

    if (!token) {
        return <Loader message="Authenticating..." />;
    }

    return (
        <div className='container bg-white max-w-full flex flex-col justify-center items-center space-y-6'>
            <h1 className='text-6xl font-bold text-blue-700 p-2 mx-auto'>Create a New Course</h1>
            <Form onSubmit={handleSubmit}/>
        </div>
    );
};

export default CreateCoursePage;
