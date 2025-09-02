"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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



const Courses = () => {
  const [languages, setLanguages] = useState<LanguagesProp[]>([]);
  const [index, setIndex] = useState<boolean>(true);
  const [userCourses, setUserCourses] = useState<UserCoursesType | null>(null);

  const { data: session } = useSession();
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  useEffect(() => {

    //if (!session?.user?.id) return;

    async function fetchPosts() {
      
      
      const res = await axios.post(`${backendUrl}/courses/uns`,{},   {
          headers: {
              Authorization: `Bearer ${session?.accessToken}`, 
          },
      });
      
      setIndex(false);
      setLanguages(res.data.languages);
      setUserCourses(res.data.user_courses);
      
    }

    fetchPosts();
  }, [backendUrl, session]);

  const onClick = (courses: string) => {
  
    async function red() {

      
        const res = await axios.post(`${backendUrl}/courses/dos`, {coursesId: courses},  {
          headers: {
              Authorization: `Bearer ${session?.accessToken}`, 
          },
        });


        
        // TODO: courses
        setUserCourses(res.data.user_courses); 
    }
    red();
    //console.log(courses)
       
  };


  if (index) return <div>Loading...</div>;
  
  
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill, minmax(210px, 1fr))] gap-4">
      {languages.map((word) => (
          
          <CoursesRed key={word._id}
            id={word._id}
            title={word.title}
            images={word.image_src} 
            courses={word.courses}
            onClick={onClick}
            active={word.courses == userCourses?.courses}
          />
        
      ))}
    </div>
  );
};

export default Courses;
