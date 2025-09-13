import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    abc_title: string;
    abc_name: string; 
    abc_url_text: string;
}




export const Unit = ({ 
    abc_title,
    abc_name,
    abc_url_text
}: Props) => {

    const styleMap: Record<string, string> = {
        special: "bg-green-900 text-white",
        danger: "bg-red-700 text-white",
        info: "bg-blue-700 text-white",
    };
    
    const containerClass = `w-full rounded-xl p-4 flex items-center justify-between ${styleMap[abc_url_text]}`;

    return (
        <div className={containerClass}>
            <div className="space-y-2.5">
                <h1 className="text-2xl font-bold">{abc_title}</h1>
                <p className="text-lg">
                    {abc_name}
                </p>
            </div>
           
        </div>
    )
};