import { Button } from "../ui/button";

type Props = {
    onCheck: () => void;
}


export const Footer : React.FC<Props> = ({ onCheck }) => {
    return (
        <footer className="lg:-h[140px] h-[100px] border-t-2">
            <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
            
            <Button onClick={onCheck}>Check</Button>


            </div>
             
        </footer>
    );
};