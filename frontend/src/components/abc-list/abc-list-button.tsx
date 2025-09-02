import { AbcListType } from "@/components/update/use-abcedaris";
import { ListButton } from "./list-button"

type AbcListButtonProps = {
  abc_list: AbcListType[];
};


export const AbcListButton = ({ abc_list }: AbcListButtonProps) => {

    
    return (
        <div className="flex items-center flex-col relative">
            {abc_list.map((abc_list, index ) => (
                <ListButton 
                  key={index}
                   abc_id={abc_list.abc_id} 
                   title={abc_list.title}
                   index={0} 
                   />
                
            ))}
        
        </div>
    )
};