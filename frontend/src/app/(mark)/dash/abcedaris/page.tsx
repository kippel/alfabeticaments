"use client";
import { Unit } from './unit';
import { DivLesson } from "@/components/div/div-lesson";
import { useAbcedaris, AbcedarisProps} from "@/components/update/use-abcedaris";
import { AbcListButton } from "@/components/abc-list/abc-list-button";



function AbcabcPage(){
    
    const {abcedaris } = useAbcedaris();
    
    
    return (
        <DivLesson text="Abc">
        
            {
                abcedaris.map((abc : AbcedarisProps, index ) => (
                    <div key={index}>
                    <Unit 
                     
                       title={abc.title}
                       name={abc.name} 
                       url_text={abc.url_text}
                    />
                    
                    <AbcListButton abc_list={abc.abc_list} title_name={abc.title_name} />
                    </div>
                ))
            }
        </DivLesson>
        
    )
}

export default AbcabcPage;
