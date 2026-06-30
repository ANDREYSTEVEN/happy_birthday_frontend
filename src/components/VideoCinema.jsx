import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function VideoCinema({ videoUrl, isVideoEmbed, lightsOff, setLightsOff }) {
  return (
    <div className={`cinema-section ${lightsOff ? 'z-50' : ''}`}>
      
      {/* Encabezado */}
      <div 
        className="cinema-header" 
        style={{ opacity: lightsOff ? 0 : 1, visibility: lightsOff ? 'hidden' : 'visible' }}
      >
        <h2 className="cinema-title">Un Mensaje Especial para Ti</h2>
        <p className="cinema-subtitle">
          He preparado un pequeño video con algunas sorpresas. Te recomiendo apagar las luces para verlo mejor.
        </p>
      </div>

      {/* Contenedor del video con Ambilight */}
      <div className="video-glow-wrapper">
        
        {/* Retroiluminación ambiental */}
        <div className="video-ambilight"></div>

        {/* Estructura del marco de video */}
        <div className="video-frame">
          
          {/* Botón de Luces flotante */}
          <button
            onClick={() => setLightsOff(!lightsOff)}
            className={`btn-lights ${lightsOff ? 'btn-lights-off' : 'btn-lights-on'}`}
          >
            {lightsOff ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                Encender Luces
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                Modo Inmersivo
              </>
            )}
          </button>

          {/* Player del Video */}
          <div className="video-aspect">
            {isVideoEmbed ? (
              <iframe
                src={videoUrl}
                title="Sorpresa de Cumpleaños"
                className="video-player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={videoUrl}
                controls
                className="video-player"
                poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop"
              >
                Tu navegador no soporta video.
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
