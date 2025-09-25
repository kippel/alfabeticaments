"use client";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";

type HoraUnsProps = {
    hora_numbro_uns: number;
    hora_courses: string;
}

/*
  { "hora_numbro_uns" : 1,
    "hora_courses" : "ca"}
*/
export const useHoraUns = () => {
    const { data: session } = useAuth();
    const [horauns, setHorauns] = useState<HoraUnsProps[]>([]);
    useEffect(() => {
        const controller = new AbortController();
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken) return;

        async function fetchAbecedaris() {
            const res = await axios.post<{ hora_uns: HoraUnsProps[] }>(
                `${backendUrl}/hora/hora_uns`,
                { },
                {
                    headers: { Authorization: `Bearer ${session.accessToken}` },
                    signal: controller.signal,
                }
            );
            setHorauns(res.data.hora_uns);
        }
        fetchAbecedaris()

    }, [session?.accessToken]);

    return { horauns }

};


type HoraDosProps = {
    hora_numbro_uns : number;
    hora_numbro_dos : number;
    hora_courses : string;
}

/*
{ 
    "hora_numbro_uns" : 1,
    "hora_numbro_dos" : 1,
    "hora_courses" : "ca"
}
*/
export const useHoraDos = ({hora_numbro_uns}) => {
    const { data: session } = useAuth();
    const [horados, setHorados] = useState<HoraDosProps[]>([]);
    useEffect(() => {
        const controller = new AbortController();
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken) return;

        async function fetchAbecedaris() {
            const res = await axios.post<{ hora_uns: HoraDosProps[] }>(
                `${backendUrl}/hora/hora_dos`,
                { hora_numbro_uns: hora_numbro_uns},
                {
                    headers: { Authorization: `Bearer ${session.accessToken}` },
                    signal: controller.signal,
                }
            );
            setHorados(res.data.hora_dos);
        }
        fetchAbecedaris()

    }, [session?.accessToken, hora_numbro_uns]);
    
    return { horados }

};



/*
{"hora_id": 1,
     "hora_numbro_uns" : 1,
     "hora_numbro_dos" : 1,
     "hora_voice_mp3" : "/mp3/ca/les-una.mp3",
     "hora_expressio" : "Les una",
     "hora" : "1:00",
     "hora_courses" : "ca"
    }

*/

export type HoraTresProps = {
    hora_id : number;
    hora_numbro_uns : number;
    hora_numbro_dos : number; 
    hora_voice_mp3 : string;
    hora_expressio : string;
    hora : string;
    hora_courses : string;
}


export const useHoraTres = ({hora_numbro_uns, hora_numbro_dos}) => {
    const { data: session } = useAuth();
    const [horatres, setHoratres] = useState<HoraTresProps[]>([]);
    useEffect(() => {
        const controller = new AbortController();
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!session?.accessToken) return;

        async function fetchAbecedaris() {
            const res = await axios.post<{ hora_uns: HoraTresProps[] }>(
                `${backendUrl}/hora/hora_tres`,
                { hora_numbro_uns: hora_numbro_uns,
                  hora_numbro_dos: hora_numbro_dos,  
                },
                {
                    headers: { Authorization: `Bearer ${session.accessToken}` },
                    signal: controller.signal,
                }
            );
            setHoratres(res.data.hora_tres)
        }

        fetchAbecedaris()
    
    }, [session?.accessToken, hora_numbro_uns, hora_numbro_dos]);

    return { horatres }
};