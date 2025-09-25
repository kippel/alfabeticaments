import { JSX } from "react";
import { AbcedListPage } from "./abcedlist"

// abc_id

type PageProps = {

  searchParams: Promise<{ abc_palabras?: string; abcedaris_id: number }>;
};

export default async function LessonPage({ searchParams }: PageProps): Promise<JSX.Element> {
  
  const { abc_palabras, abcedaris_id } = await searchParams;
  
  return (
    <AbcedListPage 
       abcedaris_id={abcedaris_id}
       abcedaris_palabras={abc_palabras}
     />
  );
}

