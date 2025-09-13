"use client";
import { Unit } from './unit';
import { DivUnLesson } from "@/components/div/div-lesson";
import { useAbcedaris, AbcedarisProps} from "@/components/update/use-abcedaris";
import { AbcListButton } from "@/components/abc-list/abc-list-button";



function AbcabcPage(){
    
    const {abcedaris } = useAbcedaris();
    
    
    return (
        <DivUnLesson>
        
            {
                abcedaris.map((abc : AbcedarisProps, index ) => (
                    <div key={index}>
                    <Unit 
                     
                       abc_title={abc.abc_title}
                       abc_name={abc.abc_name} 
                       abc_url_text={abc.abc_url_text}
                    />
                    
                    <AbcListButton 
                        abc_list={abc.abc_list} 
                        abc_title_name={abc.abc_title_name} 
                        abc_palabras={abc.abc_palabras} />
                    </div>
                ))
            }
        </DivUnLesson>
        
    )
}

export default AbcabcPage;
