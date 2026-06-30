import React from 'react';
import { Camera, CalendarRange } from 'lucide-react';

export default function Scrapbook({ memories }) {
  if (!memories || memories.length === 0) return null;

  return (
    <div className="gallery-section">
      
      {/* Encabezado */}
      <div className="section-header">
        <div className="section-icon-circle" style={{ color: '#8b5cf6' }}>
          <Camera className="w-5 h-5" />
        </div>
        <h2 className="section-title">Nuestra Colección de Momentos</h2>
        <p className="section-subtitle">
          Algunos de los recuerdos más bonitos capturados en imágenes. Pasa el cursor sobre cada foto para leer la historia.
        </p>
      </div>

      {/* Grid Estilo Editorial */}
      <div className="gallery-grid">
        {memories.map((memory, index) => {
          const isOffset = index % 2 === 1;
          
          return (
            <div 
              key={memory.id} 
              className={`gallery-card ${isOffset ? 'gallery-card-offset' : ''}`}
            >
              {/* Imagen de fondo */}
              <img 
                src={memory.image} 
                alt={memory.title} 
                className="gallery-img"
              />

              {/* Degradado y Contenido */}
              <div className="gallery-overlay">
                <div className="gallery-info">
                  {/* Fecha */}
                  <div className="gallery-date">
                    <CalendarRange className="w-3.5 h-3.5" />
                    <span>{memory.date}</span>
                  </div>

                  {/* Título */}
                  <h3 className="gallery-card-title">
                    {memory.title}
                  </h3>

                  {/* Descripción */}
                  <p className="gallery-card-desc">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
