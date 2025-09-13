type Props =  {
    abc_index: number;
}



export const CycleIndex = ({
   abc_index 
}: Props) => {
    const cycleLength = 8;
    const cycleIndex = abc_index % cycleLength;

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40;

    return { rightPosition }
}