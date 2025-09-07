"use client"
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useTheme } from "next-themes";

import {
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";
import { CycleIndex } from "./cycleIndex";

type Props = {
    abc_id: number;
    title: string;
    index: number;
    href_abc: string;
    palabras: string;
}



export const ListButton = ({
    abc_id,
    title,
    index,
    href_abc,
    palabras
}: Props) => {

    const { theme, setTheme } = useTheme();
    
    const { rightPosition } = CycleIndex({ index });
    
    const href = `${href_abc}/${abc_id}?palabras=${palabras}`    //`/lesson/${abc_id}`
    const percentage = 20;
      
    return (
        <Link href={href}>
            <div className="relative"
                style={{
                    right: `${rightPosition}px`,
                    marginTop: 20,

                }}>
                <div className="h-[102px] w-[102px] relative">
                    <CircularProgressbarWithChildren
                        value={percentage}
                        styles={buildStyles({
                            pathColor: "#3b82f6",
                            trailColor: theme === "dark" ? "#374151" : "#e5e7eb",
                        })}
                    >
                        <Button variant="secondary" size="rounded" className="h-[70px] w-[70px] border-b-8">

                    <Star className="h-10 w-10 "  />

                    </Button>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </Link>
    )
};