
export type Props = {
  children: React.ReactNode;
  text: string;
};


export const DivLesson = ({ text, children }: Props) => {
    return (
        <div className="h-full max-w-[912px] px-5 p-5 mx-auto">
            <h1 className="text-2xl font-bol">{ text }</h1>
            { children }
        </div>
    )
};



export type DivProps = {
  children?: React.ReactNode;
};

export const DivBar = ({children}: DivProps) => {
    return (
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                   { children }
                </div>
            </div>
        </div>  
    )
};