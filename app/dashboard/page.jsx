'use client'
import Topbar from "../components/Molecular/topbar";
import Navbar from "../components/Organism/navBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/constants/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!user && !loading) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    // Sample subjects array
    const subjects = [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "Physics" },
        { id: 3, name: "Chemistry" },
        { id: 4, name: "Biology" },
        { id: 5, name: "ComputerScience" },
        { id: 6, name: "English" },
        { id: 7, name: "History" },
        { id: 8, name: "Geography" },
        { id: 9, name: "Economics" },
        { id: 10, name: "Political Science" },
        { id: 11, name: "Philosophy" },
        { id: 12, name: "Psychology" },
    ];

    // Handle subject click to redirect to the subject page
    const handleSubjectClick = (subjectName) => {
        router.push(`/subjects/${subjectName.toLowerCase()}`);
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
                <div className="mt-5 flex-1 overflow-y-auto px-4 space-y-4">
                    <h2 className="text-2xl font-bold">Subjects</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {subjects.map(subject => (
                            <div
                                key={subject.id}
                                className="bg-base-300 p-4 h-32 rounded-lg flex justify-center items-center cursor-pointer hover:bg-base-500 transition"
                                onClick={() => handleSubjectClick(subject.name)} // Redirect on click
                            >
                                <p className="text-lg font-medium">{subject.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navbar */}
                <div className="absolute bottom-0 w-full">
                    <Navbar />
                </div>
            </div>
        </>
    );
}
