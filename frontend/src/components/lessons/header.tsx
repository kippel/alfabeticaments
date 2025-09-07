import { X } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

type Props = {
    percentage : number;
    headerx: () => void;
}


export const Header = ({ percentage, headerx} : Props) => {
    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <X onClick={headerx}
            className="text-slate-500 hover:opacity-75 transition cursor-pointer" />
            <Progress value={percentage} />
       
            
            
            </header>
    );
};