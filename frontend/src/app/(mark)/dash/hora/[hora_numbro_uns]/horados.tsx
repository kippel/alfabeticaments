"use client"
import Link from "next/link";
import { useHoraDos } from "@/components/update/user-hora";



export const  HoraDosPage = ({
    hora_numbro_uns
}) => {
    const { horados }= useHoraDos({hora_numbro_uns})
    

    return (
        <>
        
        { horados.map((worls, index) => (

            <Link 
                key={index} 
                href={`/lesson/hora/hora_numbro?hora_numbro_uns=${worls.hora_numbro_uns}&hora_numbro_dos=${worls.hora_numbro_dos}`}
            >
            hora {worls.hora_numbro_dos}
            </Link>

        ))}
        </>
        
    )
}