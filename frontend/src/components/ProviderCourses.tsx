"use client"
import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios"; 
import { useAuth } from '@/components/auth';


type Props = {
  children: ReactNode;
};

type CoursesType = {
  courses: string;
};

type AppContextType = {
  courses: CoursesType | null;
  setCourses: React.Dispatch<React.SetStateAction<CoursesType | null>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function ProviderCourses({ children }: Props) {
  const [courses, setCourses] = useState<CoursesType | null>(null);
  const { data: session} = useAuth();
 
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!session?.accessToken) return;

    async function fetchPosts() {
      try {
        const res = await axios.get(`${backendUrl}/courses/red`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        setCourses( res.data.courses.courses);
        //setCourses(res.data.courses.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchPosts();
  }, [session]); 

  return (
    <AppContext.Provider value={{ courses, setCourses }}>
      {children}
    </AppContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCourses must be used within a ProviderCourses");
  }
  return context;
}