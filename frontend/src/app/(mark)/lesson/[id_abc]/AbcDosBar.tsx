import { Sounds } from '@/components/lletres/sound';
import { LletresLesson } from '@/components/lletres/lletres-lesson';
import { ImagesLesson } from '@/components/lletres/images-lesson';

type DosType = {
    number: number;
    number_bar: number;
    abc_dos_id: number;
    lletres: string;
    voice_mp3: string;
    vocals_images: string;

}


export const AbcDosBar = ({
    number,
    number_bar,
    abc_dos_id,
    lletres,
    voice_mp3,
    vocals_images
}: DosType) => {
    return (
        <div className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <ImagesLesson vocals_images_bar={vocals_images} />
            <div className="item-body">
                <Sounds voice={voice_mp3} />
                <LletresLesson lletres={lletres} />
            </div>

        </div>
    )

}