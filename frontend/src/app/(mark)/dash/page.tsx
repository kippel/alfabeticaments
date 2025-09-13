"use client";
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useCourses } from '@/components/ProviderCourses'

function DashPage() {
    //console.log(localStorage.getItem("token"))

    const { data: session } = useSession();
    
    const { courses } = useCourses();

    return (
        <div>dash


            <Link href="/lesson">Lesson</Link>
        </div>
    )
};

export default DashPage;