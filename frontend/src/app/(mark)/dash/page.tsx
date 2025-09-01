"use client";
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useCourses } from '@/components/ProviderCourses'

function DashPage() {
    //console.log(localStorage.getItem("token"))

    const { data: session } = useSession();
    console.log(session?.user?.name)
    const { courses } = useCourses();
    console.log(courses)
    return (
        <div>dash


            <Link href="/lesson">Lesson</Link>
        </div>
    )
};

export default DashPage;