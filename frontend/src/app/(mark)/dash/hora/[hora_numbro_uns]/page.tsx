
import { HoraDosPage } from './horados';


type PagePropsT = {
  params: Promise<{
    hora_numbro_uns: string;
  }>;
};

export default async function HoraNumbroUns({ params }: PagePropsT) {
  const { hora_numbro_uns } = await params;
  
  return <HoraDosPage hora_numbro_uns={hora_numbro_uns} />
}
