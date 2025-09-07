import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    name: string; 
    url_text: string;
}




export const Unit = ({ 
    title,
    name,
    url_text
}: Props) => {

    const styleMap: Record<string, string> = {
        special: "bg-green-900 text-white",
        danger: "bg-red-700 text-white",
        info: "bg-blue-700 text-white",
    };
    
    const containerClass = `w-full rounded-xl p-4 flex items-center justify-between ${styleMap[url_text]}`;

    return (
        <div className={containerClass}>
            <div className="space-y-2.5">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg">
                    {name}
                </p>
            </div>
           
        </div>
    )
};