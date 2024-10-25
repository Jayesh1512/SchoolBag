'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/constants/firebase'; // Adjust the path to your Firebase configuration
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function SubjectPage() {
    const { subject } = useParams();
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [folderId, setFolderId] = useState(null);
    const [fileOptions, setFileOptions] = useState(null); // State to manage file options visibility
    const router = useRouter();
    const db = getDatabase();
    const storage = getStorage();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (!user) return;

        const fetchFiles = () => {
            const normalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();
            const foldersRef = ref(db, `folders/${user.uid}`);

            onValue(foldersRef, (snapshot) => {
                const foldersData = snapshot.val();
                const filesList = [];

                if (foldersData) {
                    Object.entries(foldersData).forEach(([folderId, folder]) => {
                        if (folder.name.toLowerCase() === normalizedSubject.toLowerCase()) {
                            const filesData = folder.files;
                            setFolderId(folderId);

                            if (filesData) {
                                Object.entries(filesData).forEach(([fileId, file]) => {
                                    const fileStorageRef = storageRef(storage, `files/${file.name}`);
                                    getDownloadURL(fileStorageRef).then((url) => {
                                        const fileFormat = file.name.split('.').pop();
                                        filesList.push({
                                            id: fileId,
                                            name: file.name,
                                            uploadedAt: file.uploadedAt,
                                            url,
                                            format: fileFormat,
                                        });
                                        setFiles((prevFiles) => [
                                            ...prevFiles,
                                            {
                                                id: fileId,
                                                name: file.name,
                                                uploadedAt: file.uploadedAt,
                                                url,
                                                format: fileFormat,
                                            },
                                        ]);
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

        fetchFiles();
    }, [subject, user, db, storage]);

    const renameFolder = async (newName) => {
        if (folderId) {
            const folderRef = ref(db, `folders/${user.uid}/${folderId}`);
            await update(folderRef, { name: newName });
            setShowMenu(false);
            router.push('/dashboard');
            router.refresh();
        }
    };

    const deleteFolder = async () => {
        if (folderId) {
            const folderRef = ref(db, `folders/${user.uid}/${folderId}`);
            await remove(folderRef);
            setShowMenu(false);
            router.push('/dashboard');
        }
    };

    // Function to delete a specific file
    const deleteFile = async (fileId) => {
        if (folderId) {
            const fileRef = ref(db, `folders/${user.uid}/${folderId}/files/${fileId}`);
            await remove(fileRef);
            setFiles(files.filter(file => file.id !== fileId)); // Remove the file from state
            setFileOptions(null); // Close options menu
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="p-6">
                <div className='flex justify-between items-center'>
                    <h1 className="text-3xl font-bold capitalize">{subject}</h1>
                    <div className="relative">
                        <GiHamburgerMenu
                            className='text-2xl cursor-pointer duration-300 hover:text-base-300'
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        {showMenu && (
                            <div className="absolute right-0 bg-white shadow-md rounded mt-2">
                                <button
                                    onClick={() => {
                                        const newName = prompt("Enter new folder name:", subject);
                                        if (newName) renameFolder(newName);
                                    }}
                                    className="block px-4 py-2 text-left text-base-500 hover:bg-gray-200"
                                >
                                    Rename Folder
                                </button>
                                <button
                                    onClick={deleteFolder}
                                    className="block px-4 py-2 text-left hover:bg-gray-200 text-red-600"
                                >
                                    Delete Folder
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="mt-4 text-lg">
                    Welcome to the {subject} page! Here you can find resources, study materials, and much more related to {subject}.
                </p>

                {/* Displaying the list of files */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Files</h2>
                    <ul className="list-disc mt-4 space-y-2">
                        {files.length > 0 ? (
                            files.map(file => (
                                <div
                                    className='flex items-center justify-between bg-base-400 rounded-md w-full py-4 px-4'
                                    key={file.id}
                                >
                                    <div className='flex items-center gap-2'>
                                        <p
                                            className={`text-xs px-2 py-1 w-fit rounded-md text-white ${file.format === 'pdf' ? 'bg-red-500' :
                                                file.format === 'ppt' ? 'bg-blue-500' :
                                                    file.format === 'link' ? 'bg-blue-500' :
                                                        'bg-yellow-500'
                                                }`}
                                        >
                                            {file.format.toUpperCase()}
                                        </p>
                                        <a href={file.url} className="truncate max-w-[8rem] text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                            {file.name}
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <HiOutlineDotsVertical
                                            className='cursor-pointer text-white duration-300 hover:text-base-100'
                                            onClick={() => setFileOptions(file.id === fileOptions ? null : file.id)}
                                        />
                                        {fileOptions === file.id && (
                                            <div className="absolute right-0 bg-white shadow-md rounded mt-2 w-32">
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(file.url)}
                                                    className="block px-4 py-2 w-full text-left text-base-500 hover:bg-gray-200"
                                                >
                                                    Share
                                                </button>
                                                <button
                                                    onClick={() => deleteFile(file.id)}
                                                    className="block px-4 py-2 w-full text-left text-red-600 hover:bg-gray-200"
                                                >
                                                    Delete File
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
