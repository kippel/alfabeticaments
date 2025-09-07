'use client'
import { Volume, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    voice: string;
};

export const Sounds = ({ voice }: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;

        audioRef.current.muted = isMuted;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) =>
            console.error('Play error:', err)
        );
    };

    // ✅ Reproduce automáticamente cuando `voice` cambie y esté listo
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleCanPlay = () => {
            audio.muted = isMuted;
            audio.play().catch(console.error);
        };

        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.load(); // fuerza recarga del src

        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlay);
        };
    }, [voice, isMuted]);

    return (
        <div className="flex flex-col items-start space-y-2">
            <audio ref={audioRef} src={voice} preload="auto" />

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