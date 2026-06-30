import React, { useState } from 'react';
import Login from './components/Login';
import MusicPlayer from './components/MusicPlayer';
import VideoCinema from './components/VideoCinema';
import Scrapbook from './components/Scrapbook';
import WishJar from './components/WishJar';
import TriviaQuiz from './components/TriviaQuiz';
import { Heart } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lightsOff, setLightsOff] = useState(false);
  const [startMusic, setStartMusic] = useState(false);
  const [content, setContent] = useState(null);

  const handleLoginSuccess = (payload) => {
    setContent(payload);
    setIsLoggedIn(true);
    setStartMusic(true);
  };

  return (
    <div>
      {/* Orbes de Fondo Dinámicos */}
      <div className="ambient-glow">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Overlay de Modo Inmersivo */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.96)',
          transition: 'all 1s ease',
          pointerEvents: 'none',
          opacity: lightsOff ? 0.95 : 0,
          zIndex: lightsOff ? 40 : 0
        }}
      />

      {!isLoggedIn ? (
        // Login Seguro
        <Login onLogin={handleLoginSuccess} apiUrl={API_URL} />
      ) : (
        // Contenido Principal
        <div className="main-container">
          
          {/* Header Principal */}
          <header 
            className="app-header"
            style={{
              opacity: lightsOff ? 0 : 1,
              transform: lightsOff ? 'translateY(-20px)' : 'translateY(0)',
              pointerEvents: lightsOff ? 'none' : 'auto'
            }}
          >
            {/* Plaqueta Decorativa */}
            <div className="badge-romantic">
              <Heart className="w-3 h-3 fill-current animate-pulse" />
              <span>Para alguien irremplazable</span>
            </div>

            {/* Título */}
            <h1 className="app-title">
              Feliz Cumpleaños, <br className="sm:hidden" />
              <span className="gold-gradient-text">{content.birthdayName}</span>
            </h1>
            
            {/* Subtítulo */}
            <p className="app-subtitle">
              Un rincón íntimo para celebrar tu vida, revivir nuestras risas y dejarte algunos detalles que guardo con cariño. Desliza hacia abajo para descubrir todo.
            </p>
          </header>

          {/* Sección 1: Video Cinema */}
          <section id="video-cinema">
            <VideoCinema 
              videoUrl={content.videoUrl} 
              isVideoEmbed={content.isVideoEmbed} 
              lightsOff={lightsOff} 
              setLightsOff={setLightsOff} 
            />
          </section>

          {/* Contenido Secundario */}
          <main 
            style={{
              transition: 'all 1s ease',
              opacity: lightsOff ? 0 : 1,
              transform: lightsOff ? 'translateY(24px)' : 'translateY(0)',
              pointerEvents: lightsOff ? 'none' : 'auto'
            }}
          >
            {/* Sección 2: Recuerdos */}
            <section id="scrapbook" style={{ borderTop: '1px solid var(--color-border)' }}>
              <Scrapbook memories={content.memories} />
            </section>

            {/* Sección 3: Sobres */}
            <section id="wish-jar" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
              <WishJar wishes={content.wishes} />
            </section>

            {/* Sección 4: Trivia */}
            <section id="trivia" style={{ borderTop: '1px solid var(--color-border)' }}>
              <TriviaQuiz triviaData={content.trivia} />
            </section>
          </main>

          {/* Footer del Sitio */}
          <footer 
            className="app-footer"
            style={{ opacity: lightsOff ? 0 : 1 }}
          >
            <div className="app-footer-heart">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 fill-current" style={{ color: '#ef4444', opacity: 0.8 }} />
              <span>con motivo de celebrar tu día</span>
            </div>
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} &bull; Todos los momentos guardados con cariño.
            </p>
          </footer>

          {/* Reproductor de Música Flotante de Cristal */}
          <MusicPlayer musicUrl={content.backgroundMusicUrl} autoPlayTrigger={startMusic} />
        </div>
      )}
    </div>
  );
}
