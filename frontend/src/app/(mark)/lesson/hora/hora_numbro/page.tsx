
import { HoraTresPage } from "./hora-tres";

type PageProps = {

  searchParams: Promise<{ hora_numbro_uns?: number; hora_numbro_dos?: number;}>;
};


export default async function HoraPage({ searchParams }: PageProps): Promise<JSX.Element> {
    const { hora_numbro_uns, hora_numbro_dos } = await searchParams;
    
    
    
    return (
      <HoraTresPage 
         hora_numbro_uns={hora_numbro_uns} 
         hora_numbro_dos={hora_numbro_dos}
      />

      
    )
}