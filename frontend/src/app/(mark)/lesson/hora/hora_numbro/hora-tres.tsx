"use client";


import { useHoraTres, HoraTresProps } from "@/components/update/user-hora"
import { useEffect, useState } from "react";
import { Header } from '@/components/lessons/header';
import { useRouter } from "next/navigation";
import { Footer } from '@/components/lessons/footer';
import { HoraQuarte } from "./hora-quarte";

export const HoraTresPage = ({ hora_numbro_uns, hora_numbro_dos}: Props) => {
    
    const [posts_hora, setPostsHora] = useState<HoraTresProps[]>([]);
    const [percentage, setPercentage] = useState(0);
    const [coute, setCoute] = useState<number>(0);
    const router = useRouter();

    const router_href = `/dash/hora/${hora_numbro_uns}`;

    const { horatres } = useHoraTres({
        hora_numbro_uns : hora_numbro_uns,
        hora_numbro_dos : hora_numbro_dos
    })


    const handleCheck = () => {
        console.log('Button clicked: check performed');
        
        if (coute + 1 < posts_hora.length){
            setCoute(coute + 1);
        } else{
            // todo
            //await axios.get(`${backendUrl}/abc/abc_un/update/${abc_un}`)
            router.push(router_href);
        }
            
        
    };

    
    useEffect(() => {
        setPostsHora(horatres);
    }, [horatres]);

    const headerxCheck = () => {
        router.push(router_href)
    }

    const currentPost = posts_hora[coute];

    return (
        <>
        <Header percentage={percentage} headerx={headerxCheck} />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    
                    
                    <HoraQuarte 
                            hora_expressio={currentPost?.hora_expressio}
                            hora_voice_mp3={currentPost?.hora_voice_mp3}
                            hora={currentPost?.hora}                   />
                </div>
            </div>
        </div>    
        
        <Footer onCheck={handleCheck}  />      
        </>
    )

};