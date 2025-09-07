import Image from "next/image"

type Props = {
    vocals_images_bar: string;
}


export const ImagesLesson = ({ vocals_images_bar} : Props) => {
    return (
        <>
        { vocals_images_bar && (
                        <Image
                        src={vocals_images_bar}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className="w-48 h-48 float-left"
                        />
                    )}
        </>
    )
}