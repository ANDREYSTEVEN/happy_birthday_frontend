import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer({ musicUrl, autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("La reproducción automática requiere interacción:", err));
    }
  }, [autoPlayTrigger, musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error(err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="music-capsule">
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
      />

      {/* Botón Icono */}
      <div className="music-capsule-icon" onClick={togglePlay}>
        <Music className="w-4 h-4" />
      </div>

      {/* Fila de Controles */}
      <div className="music-controls-row">
        <button
          onClick={togglePlay}
          className="music-control-btn"
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current pl-0.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="music-control-btn"
          title={isMuted ? "Quitar silencio" : "Silenciar"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Espectrógrafo */}
        {isPlaying && (
          <div className="music-spectrograph">
            <span className="spectrograph-bar" style={{ animationDelay: '0.1s' }}></span>
            <span className="spectrograph-bar" style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}></span>
            <span className="spectrograph-bar" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}></span>
          </div>
        )}
      </div>
    </div>
  );
}
