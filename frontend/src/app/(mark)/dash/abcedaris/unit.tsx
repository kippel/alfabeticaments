import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    name: string; 
}


export const Unit = ({ 
    title,
    name,
}: Props) => {
    return (
        <div className="w-full rounded-xl bg-green-900 p-4 text-white flex items-center justify-between">
            <div className="space-y-2.5">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg">
                    {name}
                </p>
            </div>
           
        </div>
    )
};