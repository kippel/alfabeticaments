'use client'
import { Volume, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    voice: string;
}

export const SoundsOld = ({ voice }: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (!audioRef.current) return;

        audioRef.current.muted = isMuted;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => console.error('Play error:', err));
    };

    ///togglePlay();
  
    return (
        <div className="flex flex-col items-start space-y-2">
        
            <audio ref={audioRef} src={voice} preload="auto" />

            {/* Botón de mute/unmute con íconos */}
            <button
                onClick={togglePlay}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
                {isMuted ? (
                    <Volume className="w-6 h-6 text-gray-600" />
                ) : (
                    <Volume2 className="w-6 h-6 text-green-600" />
                )}
            </button>

            
        </div>
    );
};