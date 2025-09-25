import { LletresLesson } from "@/components/lletres/lletres-lesson";
import { Sounds } from "@/components/lletres/sound";
import { HoraTresProps } from "@/components/update/user-hora"

type HoraTresP = {
    hora_expressio : string;
    hora_voice_mp3 : string;
    hora : string;
}

export const HoraQuarte = ({
    hora_expressio,
    hora_voice_mp3,
    hora
} : HoraTresP ) => {

    return (
         <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
        <LletresLesson lletres={hora} />
        <LletresLesson lletres={hora_expressio} />
        <Sounds voice={hora_voice_mp3} />
        </div>
    )

};