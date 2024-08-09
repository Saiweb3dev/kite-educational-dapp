// Import necessary types and components
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Global CSS styles
import Navbar from "@/components/Navbar"; // Navbar component
import { config } from "../../config"; // wagmi configuration
import { WagmiProvider } from "wagmi"; // Provider for wagmi (Web3)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query setup

// Initialize Inter font with specific subsets
const inter = Inter({ subsets: ["latin"] });

// Create a new instance of QueryClient for React Query
const queryClient = new QueryClient();

/**
 * RootLayout component wraps the entire application, providing global styles,
 * the Navbar component, and necessary providers for wagmi and React Query.
 * @param {{ children: React.ReactNode }} props - Props passed to RootLayout
 * @returns JSX.Element - The layout structure with children components rendered inside
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // RootLayout structure starts with an HTML document
    <html lang="en">
      {/* Body element includes global styles from the Inter font */}
      <body className={inter.className}>
        {/* Wrap the application with WagmiProvider to enable Web3 functionality */}
        <WagmiProvider config={config}>
          {/* Wrap the application with QueryClientProvider for state management */}
          <QueryClientProvider client={queryClient}>
            {/* Render the Navbar component at the top of the layout */}
            <Navbar/>
          </QueryClientProvider>
        </WagmiProvider>
        
        {/* Render children components passed to RootLayout */}
        {children}
      </body>
    </html>
  );
}
