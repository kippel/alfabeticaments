"use client";
import { useAbcedList } from "@/components/update/use-abcedaris"

type Props = {
    id_abc: number;
    palabras: string;
}

export const AbcedListPage = ({ id_abc, palabras}: Props) => {

    const {abcedlist} = useAbcedList({id_abc, palabras});
    console.log(abcedlist)
    return (
        <>
            {id_abc}
            {palabras}
        </>


    )
}