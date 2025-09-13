"use client";
import { useState, useEffect } from 'react'

import { useAbcedList, AbcedType } from "@/components/update/use-abcedaris"
import { Header } from '@/components/lessons/header';
import { Footer } from '@/components/lessons/footer';

import { AbcDosBar } from './AbcDosBar';

import { useRouter } from "next/navigation";

type Props = {
    abcedaris_id: number;
    abcedaris_palabras: string;
}

export const AbcedListPage = ({ abcedaris_id, abcedaris_palabras}: Props) => {


    const [posts, setPosts] = useState<AbcedType[]>([]);

    const [percentage, setPercentage] = useState(0);
    const [coute, setCoute] = useState<number>(0);
    const router = useRouter();
    
    const {abcedlist} = useAbcedList({
        abcedaris_list : abcedaris_id,
        abcedaris_palabras: abcedaris_palabras
    });

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
                {currentPost && currentPost.abcedaris_list_id === 1 && (
                   
                   <AbcDosBar
                        abcedaris_number={currentPost.abcedaris_number}
                        abcedaris_number_bar={currentPost.abcedaris_number_bar}
                        abcedaris_dos_id={currentPost.abcedaris_dos_id}
                        abcedaris_lletres={currentPost.abcedaris_lletres}
                        abcedaris_voice_mp3={currentPost.abcedaris_voice_mp3}
                        abcedaris_vocals_images={currentPost.abcedaris_vocals_images}
                    />
                   )
                }

                {currentPost && currentPost.abcedaris_list_id === 2 && (
                    <>foo</>
                )  
                }
                </div>
                </div>
            </div>
            <Footer onCheck={handleCheck} />
        </>


    )
}