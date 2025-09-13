import { AbcListType } from "@/components/update/use-abcedaris";
import { ListButton } from "./list-button"

type AbcListButtonProps = {
  abc_list: AbcListType[];
  abc_title_name: string;
  abc_palabras: string;
};


export const AbcListButton = ({ 
    abc_list,
    abc_title_name,
    abc_palabras
}: AbcListButtonProps) => {

    
    return (
        <div className="flex items-center flex-col relative">
            {abc_list.map((abc_list, index ) => (
                <ListButton 
                  key={index}
                   abc_id={abc_list.abc_id} 
                   abc_title={abc_list.abc_title}
                   abc_palabras={abc_palabras}
                   abc_index={index} 
                   abc_href_abc={abc_title_name}

                />
                
            ))}
        </div>
    )
};