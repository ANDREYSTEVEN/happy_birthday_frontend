import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer({ musicUrl, autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // 30% de volumen por defecto
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("La reproducción automática requiere interacción:", err));
    }
  }, [autoPlayTrigger, musicUrl]);

  // Aplicar volumen y estado de silencio al reproductor nativo
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

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

        {/* Barra deslizadora de volumen */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            const newVol = parseFloat(e.target.value);
            setVolume(newVol);
            if (newVol > 0 && isMuted) {
              setIsMuted(false);
            } else if (newVol === 0 && !isMuted) {
              setIsMuted(true);
            }
          }}
          className="volume-slider"
          title={`Volumen: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
        />

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
