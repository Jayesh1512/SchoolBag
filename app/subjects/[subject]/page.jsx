'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/constants/firebase'; // Adjust the path to your Firebase configuration
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

export default function SubjectPage() {
    const { subject } = useParams(); // Get the dynamic subject from the URL
    const [files, setFiles] = useState([]); // State to store files
    const [user, setUser] = useState(null); // State for authenticated user
    const router = useRouter(); // Use router for navigation
    const db = getDatabase();
    const storage = getStorage(); // Initialize Firebase Storage

    useEffect(() => {
        // Check authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Set the user if logged in
            } else {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router]);

    useEffect(() => {
        if (!user) return; // If no user is logged in, exit early

        const fetchFiles = () => {
            // Normalize subject to ensure consistent naming
            const normalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();
            const foldersRef = ref(db, `folders/${user.uid}`); // Reference to user-specific folders

            onValue(foldersRef, (snapshot) => {
                const foldersData = snapshot.val();
                const filesList = [];

                if (foldersData) {
                    // Loop through folders to find the specific subject folder
                    Object.entries(foldersData).forEach(([folderId, folder]) => {
                        if (folder.name.toLowerCase() === normalizedSubject.toLowerCase()) {
                            const filesData = folder.files; // Get files for the matched subject folder

                            if (filesData) {
                                // Create an array of file objects
                                Object.entries(filesData).forEach(([fileId, file]) => {
                                    // Get the download URL from Firebase Storage
                                    const fileStorageRef = storageRef(storage, `files/${file.name}`);
                                    getDownloadURL(fileStorageRef).then((url) => {
                                        filesList.push({
                                            id: fileId,
                                            name: file.name,
                                            uploadedAt: file.uploadedAt,
                                            url, // Add the download URL
                                        });
                                        setFiles((prevFiles) => [...prevFiles, { id: fileId, name: file.name, uploadedAt: file.uploadedAt, url }]); // Update the state with the file
                                    }).catch((error) => {
                                        console.error("Error getting download URL:", error);
                                    });
                                });
                            }
                        }
                    });
                } else {
                    console.log(`No folders found for user: ${user.uid}`);
                }
            });
        };

        fetchFiles(); // Fetch files when the component mounts
    }, [subject, user, db, storage]);

    return (
        <div className="h-screen flex flex-col">
            <div className="p-6">
                <h1 className="text-3xl font-bold capitalize">{subject}</h1>
                <p className="mt-4 text-lg">
                    Welcome to the {subject} page! Here you can find resources, study materials, and much more related to {subject}.
                </p>

                {/* Displaying the list of files */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Files</h2>
                    <ul className="list-disc ml-5 mt-4 space-y-2">
                        {files.length > 0 ? (
                            files.map(file => (
                                <li key={file.id}>
                                    <a href={file.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                        {file.name}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>No files available for this subject.</li>
                        )}
                    </ul>
                </div>

                {/* Go Back Button */}
                <div className="mt-6">
                    <Link href="/dashboard" className="text-blue-500 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
