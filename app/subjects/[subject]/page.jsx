'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Organism/navBar';

export default function SubjectPage() {
    const { subject } = useParams(); // Get the dynamic subject from the URL

    return (
        <div className="h-screen flex flex-col">
            <div className="p-6">
                <h1 className="text-3xl font-bold capitalize">{subject}</h1>
                <p className="mt-4 text-lg">
                    Welcome to the {subject} page! Here you can find resources, study materials, and much more related to {subject}.
                </p>

                {/* Example of adding resources for each subject */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Resources</h2>
                    <ul className="list-disc ml-5 mt-4 space-y-2">
                        <li><Link href="#">Introduction to {subject}</Link></li>
                        <li><Link href="#">Key Concepts in {subject}</Link></li>
                        <li><Link href="#">Study Materials</Link></li>
                        <li><Link href="#">Practice Questions</Link></li>
                    </ul>
                </div>

                {/* Go Back Button */}
                <div className="mt-6">
                    <Link href="/" className="text-blue-500 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>

        </div>
    );
}
