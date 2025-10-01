import { Button } from '@/components/ui/button';
import Courses from './courses'
import Link from "next/link";

const LanguagesPage = () => {

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold">
                <Link href="/dash">
                    Languages
                </Link>    
                
            </h1>
            <Courses />

            <Button asChild>
            <Link href="/dash">
                Courses
            </Link> 
            </Button>

        </div>
    )
}

export default LanguagesPage;