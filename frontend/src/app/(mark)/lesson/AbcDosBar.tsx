import { Sounds } from '@/components/lletres/sound';
import { LletresLesson } from '@/components/lletres/lletres-lesson';
import { ImagesLesson } from '@/components/lletres/images-lesson';

/*
"abcedaris_number": 1,
"abcedaris_number_bar": 1,
"abcedaris_dos_id": 1,
"abcedaris_lletres": "pa",
"abcedaris_voice_mp3": "/mp3/ca/pa.wav",
"abcedaris_vocals_images": "/images/bread.svg",
"abcedaris_list_id" : 1
*/
type DosType = {
    abcedaris_number: number;
    abcedaris_number_bar: number;
    abcedaris_dos_id: number;
    abcedaris_lletres: string;
    abcedaris_voice_mp3: string;
    abcedaris_vocals_images: string;

}




export const AbcDosBar = ({
    abcedaris_number,
    abcedaris_number_bar,
    abcedaris_dos_id,
    abcedaris_lletres,
    abcedaris_voice_mp3,
    abcedaris_vocals_images
}: DosType) => {
    return (
        <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <ImagesLesson vocals_images_bar={abcedaris_vocals_images} />
            <div className="item-body">
                <Sounds voice={abcedaris_voice_mp3} />
                <LletresLesson lletres={abcedaris_lletres} />
            </div>

        </div>
    )

}