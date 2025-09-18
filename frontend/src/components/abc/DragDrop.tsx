"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { AbcedarisWorldIdType, AbcedarisWorldType } from "@/components/update/use-abcedaris"
import { Sounds } from '@/components/lletres/sound';


type Word = {
  id: number;
  abcedaris_idle: number;
  abcedaris_world: string;

};

type WordId = {
  abcedaris_idle_red: number;
  abcedaris_world_red: string;
}



//const correctAnswer = { id: 1, label: "po" };
// {"abcedaris_idle" : 1, "abcedaris_world" : "pa" }
function DraggableWord({ word }: { word: Word }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(word.abcedaris_idle),
      data: word,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-move"
    >
      {word.abcedaris_world}
    </div>
  );
}

function BlankDropArea({
  onDropWord,
  droppedWord,
}: {
  onDropWord: (word: Word) => void;
  droppedWord: Word | null;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "blank",
  });

  return (
    <span
      ref={setNodeRef}
      className={`inline-block min-w-[40px] border-b-2 border-gray-400 px-2 text-center mx-1 ${
        isOver ? "bg-yellow-100" : ""
      }`}
    >
      {droppedWord ? (
        <span className="font-semibold">{droppedWord.abcedaris_world}</span>
      ) : (
        <span className="inline-block min-w-[40px]">&nbsp;</span>
      )}
    </span>
  );
}

export const AbcDragDrop = ({
  abcedaris_voice_mp3,
  abcedaris_world,
  abcedaris_world_id}: {
  abcedaris_voice_mp3: string;
  abcedaris_world : AbcedarisWorldType[],
  abcedaris_world_id: AbcedarisWorldIdType[]
}) => {
  
  const [words] = useState<Word[]>(abcedaris_world);
  const [checked, setChecked] = useState(false);
  const [droppedWord, setDroppedWord] = useState<Word | null>(null);    
  const [correctAnswer] = useState<WordId>(abcedaris_world_id[0]);

  const handleDragEnd = (event: any) => {
    if (event.over && event.active.data.current) {
      setDroppedWord(event.active.data.current as Word);
      setChecked(false);
    }
  };

  const handleCheck = () => {
    setChecked(true);
  };

  const isCorrect = droppedWord?.abcedaris_idle === correctAnswer.abcedaris_idle_red;

  return (
    <>
     
      <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 max-w-lg mx-auto space-y-6">
       
       

        <p className="text-lg">
          
          <BlankDropArea droppedWord={droppedWord} onDropWord={setDroppedWord} />
              
        </p>
        <Sounds voice={abcedaris_voice_mp3} />
        <div className="flex gap-4">
          {words.map((word, index) => (
            <DraggableWord key={index} word={word} />
          ))}
        </div>

        <Button onClick={handleCheck}>Check Answer</Button>

        {checked && (
          <p
            className={`text-sm font-medium ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "✅ Correct!" : "❌ Try again."}
          </p>
        )}
      </div>
    </DndContext>
    </>
  );
}
