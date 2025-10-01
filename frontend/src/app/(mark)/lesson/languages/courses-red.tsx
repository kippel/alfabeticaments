import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    id: string;
    title: string;
    images: string;
    courses: string;
    onClick: (id: string) => void;
    disabled?: boolean;
    active?: boolean;
}


const CoursesRed = ({ 
    id,
    title,
    images,
    courses,
    onClick,
    disabled,
    active
} : Props) => {

    ///console.log(images)
    ///console.log("ddd")
    return (
        <div onClick={() => onClick(courses)} className={cn("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3  pb-6 min-h-[217px] min-w-[200px]",
                disabled && "pointer-events-none opacity-50"
            )}>
            <div className="min-[24px] w-full flex items-center justify-end">
                {active && (
                    <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                        <Check className="text-amber-50 stroke-[4] h-4 w-4" />
                    </div>
                )}
            </div> 
              
            <Image
                src={images}
                alt={title}
                height={24}
                width={100}
                className="rounded-lg drop-shadow-md border object-cover"
            />
            
            <p className="text-center font-bold mt-3">
                {title}
            </p></div>
    )
};

export default CoursesRed;