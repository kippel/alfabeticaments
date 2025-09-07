"use client";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";
import { useCourses } from "@/components/ProviderCourses";

export type AbcListType = {
  abc_id: number;
  title: string;
  palabras: string;
};

export type AbcedarisProps = {
  _id: string;
  title: string;
  courses: string;
  name: string;
  url_text: string;
  title_name: string;
  
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


type AbcedListProps = {
  id_abc: number;
  palabras: string;
};

type AbcedType = {
  number: number;
  number_bar: number;
  abc_dos_id: number;
  lletres: string;
  voice_mp3: string;
  vocals_images: string;
};

type AbcedListType = {
  abc_id: number;
  courses: string;
  palabras: string;
  abc_list: AbcedType[];
};

export const useAbcedList = ({ id_abc, palabras }: AbcedListProps) => {
  const [abcedlist, setAbcedList] = useState<AbcedListType | null>(null);
  const { data: session } = useAuth();
  const { courses } = useCourses();

  useEffect(() => {
    const controller = new AbortController();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!session?.accessToken || !backendUrl) return;

    async function fetchAbecedList() {
      console.log(courses)
      console.log(id_abc)
      console.log(palabras)
      const res = await axios.post(
        `${backendUrl}/abc/abced_list`,
        {
          coursesId: courses,
          id_abc,
          palabras,
        },
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
          signal: controller.signal,
        }
      );
      setAbcedList(res.data); // 👈 guardamos todo el objeto
    }

    fetchAbecedList();
  }, [session?.accessToken, courses, id_abc, palabras]);

  return { abcedlist };
};