"use client"
import Link from "next/link";


export const  HoraUnPage = ({
    hora_numbro_uns
}) => {

    const href = `/dash/hora/${hora_numbro_uns}`

    return (
        <Link href={href}>
            hora {hora_numbro_uns}
        </Link>
    )
}

