import { AbcListType } from "@/components/update/use-abcedaris";
import { ListButton } from "./list-button"

type AbcListButtonProps = {
  abc_list: AbcListType[];
  title_name: string;
  palabras: string;
};


export const AbcListButton = ({ 
    abc_list,
    title_name,
    palabras
}: AbcListButtonProps) => {

    
    return (
        <div className="flex items-center flex-col relative">
            {abc_list.map((abc_list, index ) => (
                <ListButton 
                  key={index}
                   abc_id={abc_list.abc_id} 
                   title={abc_list.title}
                   palabras={palabras}
                   index={index} 
                   href_abc={title_name}

                />
                
            ))}
        </div>
    )
};