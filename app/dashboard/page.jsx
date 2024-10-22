'use client';
import Topbar from "../components/Molecular/topbar";
import Navbar from "../components/Organism/navBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/constants/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Link from "next/link";

// Function to add a folder to Firebase under the user's directory
const addFolderToFirebase = async (folderName, user) => {
    const db = getDatabase();
    const folderId = new Date().getTime().toString(); // Use timestamp as folder ID for uniqueness
    const folderRef = ref(db, `folders/${user.uid}/${folderId}`); // Save the folder under user's UID with a unique ID

    await set(folderRef, {
        name: folderName,
        userId: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
    });
};

// Function to fetch user details from Firebase
const fetchUserDetails = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    return new Promise((resolve, reject) => {
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                resolve(userData); // Return user data
            } else {
                reject("User not found");
            }
        }, (error) => {
            reject(error);
        });
    });
};

// Function to fetch folders from Firebase for a specific user
const fetchFoldersAndUsers = async (userId, setFolders) => {
    const db = getDatabase();
    const foldersRef = ref(db, `folders/${userId}`);

    onValue(foldersRef, async (snapshot) => {
        const foldersData = snapshot.val();
        console.log("Fetched folders data:", foldersData); // Log fetched data

        if (foldersData) {
            const userFolders = await Promise.all(
                Object.entries(foldersData).map(async ([folderId, folder]) => {
                    console.log("Folder:", folder); // Log individual folder
                    const userDetails = await fetchUserDetails(folder.userId);
                    return {
                        id: folderId,
                        name: folder.name || "Unnamed Folder",
                        email: userDetails.email,
                        displayName: userDetails.displayName || "Unknown",
                        createdAt: folder.createdAt,
                    };
                })
            );

            setFolders(userFolders);
        } else {
            console.log("No folders found for user:", userId);
            setFolders([]);
        }
    }, (error) => {
        console.error("Error fetching folders:", error);
    });
};

export default function Home() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        if (!user && !loading) {
            router.push("/login");
        } else if (user) {
            fetchFoldersAndUsers(user.uid, setFolders); // Fetch folders and user details
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    // Toggle popup visibility
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <>
            <div className="h-screen flex flex-col relative">
                <Topbar />

                {/* Search Input */}
                <div className="mt-5 space-y-5">
                    <div className="bg-base-400 flex px-4 rounded-lg justify-between">
                        <img src="/icons/search.svg" alt="" />
                        <input type="text" className="bg-transparent py-4 outline-none" placeholder="Search subjects..." />
                    </div>
                </div>

                {/* Subjects Section */}
                <div className="mt-5 flex-1 relative overflow-y-auto px-4 space-y-4 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Render folders dynamically */}
                        {folders.map(folder => (
                            <Link href={`/subjects/${folder.name}`} key={folder.id} className=" text-white text-center h-32 grid place-content-center rounded-md p-4 bg-base-400 shadow hover:bg-base-300 duration-300">
                                <h3 className="text-lg font-semibold">{folder.name ? folder.name : "Unnamed Folder"}</h3>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Navbar */}
                <div className="absolute bottom-0 w-full">
                    <Navbar />
                </div>
            </div>

            <div className="absolute bottom-28 ml-48 z-10">
                <button
                    className="flex gap-3 items-center bg-white rounded-md duration-300 hover:bg-base-100 hover:text-white text-base-500 font-semibold px-4 py-2"
                    onClick={togglePopup} // Toggle popup on button click
                >
                    <span className="text-2xl">+</span>
                    <span>Add</span>
                </button>
            </div>

            {/* Popup */}
            <div
                className={`fixed bottom-0 mx-auto w-full z-20 lg:w-1/5 md:w-1/2 bg-base-400 p-6 rounded-t-xl shadow-xl transform transition-transform duration-300 ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Add</h2>
                    <button onClick={togglePopup} className="text-gray-500">
                        Close
                    </button>
                </div>
                <div className="mt-4">
                    <div className="flex text-xs justify-between w-full text-center">
                        <button
                            className="flex flex-col justify-between items-center hover:bg-base-300 duration-300 py-4 rounded-md"
                            onClick={() => {
                                const folderName = prompt("Enter the folder name:");
                                if (folderName && folderName.trim()) {
                                    addFolderToFirebase(folderName.trim(), user); // Call the function to add folder to Firebase
                                }
                            }}
                        >
                            <img src='/icons/create_new_folder.svg' alt="" className="p-4" />
                            <p className="w-full">Add Folder</p>
                        </button>

                        {/* Link to File Upload Page */}
                        <button
                            className="flex flex-col justify-between items-center duration-300 hover:bg-base-300 py-4 px-2 rounded-md"
                            onClick={() => router.push('/subjects/upload')} // Navigate to the new page
                        >
                            <img src='/icons/add_notes.svg' alt="" className="p-4" />
                            <p className="w-full">Add File</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
