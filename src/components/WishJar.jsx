import React, { useState } from 'react';
import { MailOpen, X, Heart } from 'lucide-react';

export default function WishJar({ wishes }) {
  const [selectedWish, setSelectedWish] = useState(null);

  if (!wishes || wishes.length === 0) return null;

  return (
    <div className="wishes-section">
      
      {/* Encabezado */}
      <div className="section-header">
        <div className="section-icon-circle" style={{ color: '#ec4899' }}>
          <MailOpen className="w-5 h-5 animate-bounce" />
        </div>
        <h2 className="section-title">Cofre de Deseos y Detalles</h2>
        <p className="section-subtitle">
          He preparado algunas cartas y cupones de regalo virtuales. Haz clic en el sobre que más te llame la atención.
        </p>
      </div>

      {/* Grid de Sobres */}
      <div className="wishes-grid">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            onClick={() => setSelectedWish(wish)}
            className="envelope-card"
          >
            {/* Adorno de esquina */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}></div>

            <div className="envelope-emoji">
              {wish.emoji}
            </div>

            <h3 className="envelope-title">
              {wish.title}
            </h3>
            
            <span className="envelope-action">
              Abrir Mensaje
            </span>
          </div>
        ))}
      </div>

      {/* Modal - La Carta Realista */}
      {selectedWish && (
        <div className="modal-overlay">
          
          <div className="letter-paper">
            
            {/* Marcos decorativos */}
            <div className="letter-frame"></div>
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              right: '8px',
              bottom: '8px',
              border: '1px solid #d5cbb3',
              opacity: 0.5,
              pointerEvents: 'none'
            }}></div>

            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedWish(null)}
              className="btn-close-letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado de la Carta */}
            <div className="letter-header">
              <span className="letter-emoji">{selectedWish.emoji}</span>
              <h3 className="letter-subtitle">Dedicatoria Especial</h3>
              <div className="letter-divider"></div>
              <h2 className="letter-title">
                {selectedWish.title}
              </h2>
            </div>

            {/* Cuerpo de la Carta */}
            <div className="letter-body">
              "{selectedWish.content}"
            </div>

            {/* Firma */}
            <div className="letter-signature-container">
              <span className="letter-signature-text">Con amor eterno</span>
              <div className="letter-signature-seal">
                <span className="letter-signature-name">Yo</span>
                <div className="letter-seal-red">
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
