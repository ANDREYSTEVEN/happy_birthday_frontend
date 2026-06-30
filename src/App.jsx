import React, { useState } from 'react';
import Login from './components/Login';
import MusicPlayer from './components/MusicPlayer';
import VideoCinema from './components/VideoCinema';
import Scrapbook from './components/Scrapbook';
import WishJar from './components/WishJar';
import TriviaQuiz from './components/TriviaQuiz';
import AdminPanel from './components/AdminPanel';
import { Heart } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Clase ErrorBoundary para capturar cualquier error de renderizado en producción y mostrar detalles
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column', gap: '20px', padding: '40px', textAlign: 'center', zIndex: 1000, position: 'relative', color: '#fff' }}>
          <h2 className="font-serif text-2xl text-red-400">Error al Cargar la Página</h2>
          <p className="text-slate-400 text-sm max-w-md">
            Detalle técnico del error:
          </p>
          <code style={{ color: '#f472b6', background: 'rgba(0,0,0,0.4)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '90%', wordBreak: 'break-all' }}>
            {this.state.error?.toString()}
          </code>
          <button onClick={() => window.location.reload()} className="btn-gold" style={{ width: 'auto', marginTop: '10px' }}>
            Recargar la Página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lightsOff, setLightsOff] = useState(false);
  const [startMusic, setStartMusic] = useState(false);
  const [content, setContent] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleLoginSuccess = (payload) => {
    console.log("Login exitoso! Datos recibidos del servidor:", payload);
    setContent(payload);
    setIsLoggedIn(true);
    setStartMusic(true);
  };

  const handleAdminAccess = async () => {
    console.log("Acceso de admin validado. Cargando datos para edición...");
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: 'bogota' })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setContent(data.content);
        setIsAdminMode(true);
      } else {
        throw new Error(data.message || 'Error cargando datos de configuración');
      }
    } catch (err) {
      console.error("Error al obtener la configuración actual del servidor:", err);
      alert("No se pudo cargar la configuración del servidor. ¿Está el backend encendido?");
    }
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

      {isAdminMode ? (
        // Panel de Administración
        <AdminPanel 
          initialContent={content} 
          apiUrl={API_URL} 
          onClose={() => {
            setIsAdminMode(false);
            setIsLoggedIn(false);
            setContent(null);
          }} 
        />
      ) : !isLoggedIn ? (
        // Login Seguro
        <Login onLogin={handleLoginSuccess} onAdminAccess={handleAdminAccess} apiUrl={API_URL} />
      ) : !content ? (
        // En caso de que la respuesta sea exitosa pero no traiga el contenido esperado
        <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column', gap: '16px', padding: '30px', textAlign: 'center', zIndex: 100, position: 'relative' }}>
          <h2 className="font-serif text-2xl text-yellow-400">Error de Integración</h2>
          <p className="text-slate-400 text-sm max-w-md">
            El acceso fue autorizado por el servidor, pero los datos de la sorpresa no se recibieron en el formato esperado. 
            Asegúrate de que el backend de Render esté actualizado con el último código de GitHub.
          </p>
        </div>
      ) : (
        // Contenido Principal envuelto en ErrorBoundary
        <ErrorBoundary>
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
        </ErrorBoundary>
      )}
    </div>
  );
}
