"use client";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";
import { useCourses } from "@/components/ProviderCourses";

/*
"abc_id": 0,
"abc_title": "Monosíl.labs 1",
"abc_lists" : 1
*/

export type AbcListType = {
  abc_id: number;
  abc_title: string;
  abc_lists: number;
};

/*
"abc_title": "Monosíl.labs",
"abc_name": "Paraula d’una sola síl·laba",
"abc_courses": "ca",
"abc_url_text" : "special",
"abc_title_name" : "/lesson",
"abc_palabras" : "monosillabs", 
"abc_max_number": 2,
*/
export type AbcedarisProps = {
  _id: string;
  abc_title: string;
  abc_courses: string;
  abc_name: string;
  abc_url_text: string;
  abc_title_name: string;
  abc_palabras: string;
  abc_max_number: number;
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
          { abc_courses: courses },
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
  id_abc: number;
  palabras: string;

abcedaris_id : number;
  abcedaris_courses: string;
  abcedaris_palabras: string;

  */

type AbcedListProps = {
  abcedaris_list: number;
  abcedaris_palabras: string;
};

export type AbcedarisWorldType = {
  abcedaris_idle: number;
  abcedaris_world: string;
}

export type AbcedarisWorldIdType = {
  abcedaris_idle_red: number;
  abcedaris_world_red: string;
}

export type AbcedType = {
  abcedaris_number: number;
  abcedaris_number_bar: number;
  abcedaris_dos_id: number;
  abcedaris_lletres?: string;
  abcedaris_voice_mp3: string;
  abcedaris_vocals_images: string;
  abcedaris_list_id: number;
  abcedaris_world?: AbcedarisWorldType[];
  abcedaris_world_id?: AbcedarisWorldIdType[];

};

type AbcedListType = {
  
  abcedaris_list: AbcedType[];
};

export const useAbcedList = ({ abcedaris_list,  abcedaris_palabras }: AbcedListProps) => {
  const [abcedlist, setAbcedList] = useState<AbcedType[]>([]);
  const { data: session } = useAuth();
  const { courses } = useCourses();
  
  useEffect(() => {
    const controller = new AbortController();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!session?.accessToken || !backendUrl) return;

    async function fetchAbecedList() {
  
      const res = await axios.post(
        `${backendUrl}/abc/abcedaris_list`,
        {
          abcedaris_courses: courses,
          abcedaris_list: abcedaris_list,
          abcedaris_palabras: abcedaris_palabras,
        },
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
          signal: controller.signal,
        }
      );
      setAbcedList(res.data.abc_list); // 👈 guardamos todo el objeto
    }

    fetchAbecedList();
  }, [session?.accessToken, courses, abcedaris_list, abcedaris_palabras]);
  
  return { abcedlist };
};