import ModeToggle from "@/components/mode-toggle";



interface Props {
    children: React.ReactNode
}

export function ButtonLogin({ children}: Props){
    return (
        <div>
            { children }
        </div>
    )
}

export function ButtonUsers({ children}: Props){
    return (
        <div className={"absolute top-5 left-4 flex items-center gap-3"}>
            { children }
        </div> 
    )
}



export function ButtonUser({ children}: Props){
    return (
        <div className={"absolute top-5 right-5 flex items-center gap-3"}>
            <ModeToggle /> 
            { children }
        </div> 
    )
}



