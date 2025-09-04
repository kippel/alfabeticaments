"use client";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";
import { useCourses } from "@/components/ProviderCourses";

export type AbcListType = {
  abc_id: number;
  title: string;
};

export type AbcedarisProps = {
  _id: string;
  title: string;
  courses: string;
  name: string;
  url_text: string;
  abc_list: AbcListType[];
};

export const useAbcedaris = () => {
  const [abcedaris, setAbcedaris] = useState<AbcedarisProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useAuth();
  const { courses } = useCourses();

  useEffect(() => {
    const controller = new AbortController();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!session?.accessToken || !backendUrl) return;

    async function fetchAbecedaris() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post<{ abcedaris: AbcedarisProps[] }>(
          `${backendUrl}/abc/abcedaris`,
          { coursesId: courses },
          {
            headers: { Authorization: `Bearer ${session.accessToken}` },
            signal: controller.signal,
          }
        );
        setAbcedaris(res.data.abcedaris);
      } catch (err) {
        if (axios.isCancel(err)) return;
        const axiosErr = err as AxiosError<{ detail?: string }>;
        setError(axiosErr.response?.data?.detail ?? "Error desconegut");
      } finally {
        setLoading(false);
      }
    }

    fetchAbecedaris();

    return () => controller.abort();
  }, [session?.accessToken, courses]);

  return { abcedaris, loading, error };
};


/*
type AbcListType = {
    id: number;
    abc_id: number;
    courses: string;
    title: string;
    number_bar: number;
}

export const useAbcList = ({ abc_id}) => {
    const [abcList,setAbcList] = useState<AbcListType[]>([]);
    const { data: session } = useAuth();
    useEffect(() => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken || !backendUrl) return;

        async function fetchAbecedaris() {
            try {
                const res = await axios.post<{ abc_list:AbcListType[]}>(
                    `${backendUrl}/abc/abc_list`, 
                    { abc_id: abc_id},
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );
                setAbcList(res.data.abc_list);
                
            } catch (error) {
                console.error("Error fetching abecedaris:", error);
            } 
            
        }

        fetchAbecedaris();

    },[session, abc_id]);

    return { abcList }
}
*/