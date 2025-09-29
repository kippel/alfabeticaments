"use client";
import { useState, useEffect, useCallback } from "react";

import { useAbcedList, AbcedType } from "@/components/update/use-abcedaris";
import { Header } from "@/components/lessons/header";
import { Footer } from "@/components/lessons/footer";
import { FooterDragDrop } from "@/components/lessons/footer-drag-drop";

import { AbcDosBar } from "@/components/abc/AbcDosBar";
import { AbcDragDrop } from "@/components/abc/DragDrop";

import { useRouter } from "next/navigation";

type Props = {
  abcedaris_id: number;
  abcedaris_palabras: string;
};

export const AbcedListPage = ({ abcedaris_id, abcedaris_palabras }: Props) => {
  const [coute, setCoute] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const router = useRouter();

  const { abcedlist } = useAbcedList({
    abcedaris_list: abcedaris_id,
    abcedaris_palabras,
  });

  const posts: AbcedType[] = abcedlist;
  const currentPost = posts[coute];

  // progress bar update
  useEffect(() => {
    if (posts.length > 0) {
      const progressPercentage = Math.round(((coute + 1) / posts.length) * 100);
      setPercentage(progressPercentage);
    }
  }, [coute, posts]);

  const handleCheck = useCallback(() => {
    if (coute + 1 < posts.length) {
      setCoute((prev) => prev + 1);
    } else {
      router.push("/dash/abcedaris");
    }
  }, [coute, posts.length, router]);

  const headerxCheck = useCallback(() => {
    router.push("/dash/abcedaris");
  }, [router]);

  // helper to render current content
  const renderContent = () => {
    if (!currentPost) return null;

    switch (currentPost.abcedaris_list_id) {
      case 1:
        return (
          <>
            <AbcDosBar
              abcedaris_number={currentPost.abcedaris_number}
              abcedaris_number_bar={currentPost.abcedaris_number_bar}
              abcedaris_dos_id={currentPost.abcedaris_dos_id}
              abcedaris_lletres={currentPost.abcedaris_lletres}
              abcedaris_voice_mp3={currentPost.abcedaris_voice_mp3}
              abcedaris_vocals_images={currentPost.abcedaris_vocals_images}
            />
            <Footer onCheck={handleCheck} />
          </>
        );

      case 2:
        return (
          <>
            <AbcDragDrop
              abcedaris_voice_mp3={currentPost.abcedaris_voice_mp3}
              abcedaris_world={currentPost.abcedaris_world}
              abcedaris_world_id={currentPost.abcedaris_world_id}
            />
            <FooterDragDrop />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header percentage={percentage} headerx={headerxCheck} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};
