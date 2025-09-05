import { AbcListType } from "@/components/update/use-abcedaris";
import { ListButton } from "./list-button"

type AbcListButtonProps = {
  abc_list: AbcListType[];
  title_name: string;
};


export const AbcListButton = ({ 
    abc_list,
    title_name
}: AbcListButtonProps) => {

    
    return (
        <div className="flex items-center flex-col relative">
            {abc_list.map((abc_list, index ) => (
                <ListButton 
                  key={index}
                   abc_id={abc_list.abc_id} 
                   title={abc_list.title}
                   index={0} 
                   href_abc={title_name}

                />
                
            ))}
        </div>
    )
};