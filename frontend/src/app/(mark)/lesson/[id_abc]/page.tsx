import { JSX } from "react";
import { AbcedListPage } from "./abcedlist"


type PageProps = {
  params: Promise<{ id_abc: string }>;
  searchParams: Promise<{ palabras?: string; }>;
};

export default async function LessonPage({ params, searchParams }: PageProps): Promise<JSX.Element> {
  const { id_abc } = await params;
  const { palabras } = await searchParams;
  
  
  return (
    <AbcedListPage 
       id_abc={id_abc}
       palabras={palabras}
     />
  );
}

