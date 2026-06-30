import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Sparkles, KeyRound, Settings, X } from 'lucide-react';

export default function Login({ onLogin, onAdminAccess, apiUrl }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState({ question: '...', hintText: '' });
  const [shake, setShake] = useState(false);
  
  // Estados para el acceso del Administrador
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminError, setAdminError] = useState('');

  // Cargar pregunta secreta desde el backend
  useEffect(() => {
    fetch(`${apiUrl}/api/question`)
      .then((res) => res.json())
      .then((data) => setQuestionData(data))
      .catch((err) => {
        console.error("Error obteniendo pregunta:", err);
        setQuestionData({
          question: "¿En qué ciudad tuvimos nuestra primera cita o salida especial?",
          hintText: "Pista: Comienza con 'B' y es la capital de Colombia... 😉"
        });
      });
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Confeti de entrada
        const end = Date.now() + 2.5 * 1000;
        const colors = ['#dfb15b', '#8b5cf6', '#f472b6', '#ffffff'];

        (function frame() {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());

        setTimeout(() => {
          onLogin(data.content);
        }, 1200);
      } else {
        throw new Error(data.message || 'Respuesta incorrecta');
      }
    } catch (err) {
      setError(err.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError('');
    if (adminPassInput === 'admin123') {
      setShowAdminModal(false);
      onAdminAccess();
    } else {
      setAdminError('Contraseña incorrecta');
    }
  };

  return (
    <div className="login-screen">
      {/* Caja de Cristal Centrada */}
      <div className={`glass-card login-card ${shake ? 'shake' : ''}`}>
        
        {/* Adorno dorado superior */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent, rgba(223, 177, 91, 0.25), transparent)'
        }}></div>

        <div className="login-icon-container">
          <KeyRound className="w-5 h-5 animate-pulse" />
        </div>

        <h1 className="login-title">Un Rincón Privado</h1>
        <p className="login-subtitle">
          He guardado algunos de nuestros recuerdos en este espacio. Responde a la pregunta secreta para entrar.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="input-label">
              {questionData.question}
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError('');
                }}
                disabled={loading}
                placeholder="Escribe tu respuesta..."
                className="input-premium"
                autoComplete="off"
              />
              <div className="input-icon-lock">
                <Lock className="w-4 h-4" />
              </div>
            </div>
          </div>

          {error ? (
            <p className="error-container">
              ⚠️ {error}
            </p>
          ) : questionData.hintText ? (
            <p className="hint-text">
              {questionData.hintText}
            </p>
          ) : null}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-gold"
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg className="animate-spin" style={{ height: '18px', width: '18px' }} fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Desbloquear Sorpresa
              </>
            )}
          </button>
        </form>
      </div>

      {/* Botón flotante de administración discreto */}
      <button 
        onClick={() => setShowAdminModal(true)} 
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.06)',
          cursor: 'pointer',
          zIndex: 100,
          outline: 'none'
        }}
        title="Configuración de administrador"
        onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.06)'}
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Modal de Acceso del Administrador */}
      {showAdminModal && (
        <div className="modal-overlay" style={{ zIndex: 200 }}>
          <div className="glass-card" style={{ padding: '32px', maxWidth: '340px', width: '100%', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={() => setShowAdminModal(false)} className="btn-close-letter" style={{ top: '16px', right: '16px' }}>
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-serif text-lg text-white mb-4" style={{ marginTop: '10px' }}>Acceso de Administrador</h3>
            
            <form onSubmit={handleAdminSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="password" 
                value={adminPassInput} 
                onChange={(e) => {
                  setAdminPassInput(e.target.value);
                  setAdminError('');
                }} 
                placeholder="Escribe admin123..." 
                className="input-premium" 
                autoFocus
              />
              {adminError && (
                <p className="error-container" style={{ margin: 0, padding: '8px 12px', fontSize: '0.75rem' }}>
                  {adminError}
                </p>
              )}
              <button type="submit" className="btn-gold">Ingresar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
