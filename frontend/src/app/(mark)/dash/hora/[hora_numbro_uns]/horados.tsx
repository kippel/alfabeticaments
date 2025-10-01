"use client"
import Link from "next/link";
import { useHoraDos } from "@/components/update/user-hora";



type HoraDosPageProps = {
    hora_numbro_uns: string | number;
}

export const  HoraDosPage = ({
    hora_numbro_uns
}: HoraDosPageProps) => {
    const { horados }= useHoraDos({hora_numbro_uns})
    

    return (
        <>
        
        {(horados ?? []).map((worls) => (

            <Link 
                key={`${worls.hora_numbro_uns}-${worls.hora_numbro_dos}`}
                href={`/lesson/hora/hora_numbro?hora_numbro_uns=${encodeURIComponent(String(worls.hora_numbro_uns))}&hora_numbro_dos=${encodeURIComponent(String(worls.hora_numbro_dos))}`}
            >
            hora {worls.hora_numbro_dos}
            </Link>

        ))}
        </>
        
    )
}