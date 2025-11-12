"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import CoursesRed from "./courses-red";
import { useSession } from "next-auth/react"


type LanguagesProp = {
  _id: string;
  title: string;
  image_src: string;
  courses: string;
};

type UserCoursesType = {
  courses_title: string;
  image_src: string; 
  courses: string;
};

type ApiResponse = {
  languages: LanguagesProp[];
  user_courses: UserCoursesType;
};

const Courses = () => {
  const [languages, setLanguages] = useState<LanguagesProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userCourses, setUserCourses] = useState<UserCoursesType | null>(null);

  const { data: session } = useSession();
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  
  useEffect(() => {
    if (!session?.accessToken) return;

    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.post<ApiResponse>(`${backendUrl}/courses/uns`, {}, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, 
          },
        });
        
        setLanguages(res.data.languages);
        setUserCourses(res.data.user_courses);
      } catch (err) {
        const axiosErr = err as AxiosError<{ detail?: string }>;
        setError(axiosErr.response?.data?.detail ?? "Error loading courses");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [backendUrl, session?.accessToken]);

  const onClick = async (courses: string) => {
    if (!session?.accessToken) return;
    
    try {
      const res = await axios.post<{ user_courses: UserCoursesType }>(`${backendUrl}/courses/dos`, 
        { coursesId: courses }, 
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`, 
          },
        }
      );
      
      setUserCourses(res.data.user_courses); 
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      setError(axiosErr.response?.data?.detail ?? "Error updating course");
    }
  };


  if (loading) return <div>Loading...</div>;
  
  if (error) return <div className="text-red-600">Error: {error}</div>;
  
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill, minmax(210px, 1fr))] gap-4">
      {languages.map((word) => (
        <CoursesRed 
          key={word._id}
          id={word._id}
          title={word.title}
          images={word.image_src} 
          courses={word.courses}
          onClick={onClick}
          active={word.courses === userCourses?.courses}
        />
      ))}
    </div>
  );
};

export default Courses;
