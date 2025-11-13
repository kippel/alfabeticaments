"use client";
import { useHoraUns} from "@/components/update/user-hora";
import { DivUnLesson } from "@/components/div/div-lesson";
import { HoraUnPage } from './horaun';

function HoraPage(){

    const { horauns } = useHoraUns();
    console.log(horauns)
    return (
        <DivUnLesson>
        { horauns.map((hora , index ) => (
            <div key={index}>
                <HoraUnPage 
                   hora_numbro_uns={hora.hora_numbro_uns} 
                />
            </div>
        ))}</DivUnLesson>
    )
}

export default HoraPage;