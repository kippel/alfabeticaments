"use client";
import { useState, useEffect } from 'react'

import { useAbcedList, AbcedType } from "@/components/update/use-abcedaris"
import { Header } from '@/components/lessons/header';
import { Footer } from '@/components/lessons/footer';

import { AbcDosBar } from './AbcDosBar';

import { useRouter } from "next/navigation";

type Props = {
    id_abc: number;
    palabras: string;
}

export const AbcedListPage = ({ id_abc, palabras}: Props) => {


    const [posts, setPosts] = useState<AbcedType[]>([]);

    const [percentage, setPercentage] = useState(0);
    const [coute, setCoute] = useState<number>(0);
    const router = useRouter();

    const {abcedlist} = useAbcedList({id_abc, palabras});

    useEffect(() => {
        setPosts(abcedlist);
    }, [abcedlist]);


    //setPosts(abcedlist);
    //console.log(abcedlist)
    const handleCheck = () => {
        console.log('Button clicked: check performed');
        
        if (coute + 1 < posts.length){
            setCoute(coute + 1);
        } else{
            // todo
            //await axios.get(`${backendUrl}/abc/abc_un/update/${abc_un}`)
            router.push('/dash/abcedaris');
        }
            
        
    };



    const headerxCheck = () => {
        router.push('/dash/abcedaris')
    }

    const currentPost = posts[coute];

    useEffect(() => {
        if (posts.length > 0) {
            const progressPercentage = Math.round(((coute + 1) / posts.length) * 100);
            setPercentage(progressPercentage);
        }
    }, [coute, posts.length]);


    return (
        <>
            <Header percentage={percentage} headerx={headerxCheck} />
            <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                {currentPost && (
                   <AbcDosBar
                        number={currentPost.number}
                        number_bar={currentPost.number_bar}
                        abc_dos_id={currentPost.abc_dos_id}
                        lletres={currentPost.lletres}
                        voice_mp3={currentPost.voice_mp3}
                        vocals_images={currentPost.vocals_images}
                    />
                   )}
                </div>
                </div>
            </div>
            <Footer onCheck={handleCheck} />
        </>


    )
}