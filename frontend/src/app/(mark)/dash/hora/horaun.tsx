"use client"
import Link from "next/link";


type HoraUnPageProps = {
    hora_numbro_uns: string | number;
}

export const  HoraUnPage = ({
    hora_numbro_uns
}: HoraUnPageProps) => {

    const href = `/dash/hora/${encodeURIComponent(String(hora_numbro_uns))}`

    return (
        <Link href={href}>
            hora {hora_numbro_uns}
        </Link>
    )
}

