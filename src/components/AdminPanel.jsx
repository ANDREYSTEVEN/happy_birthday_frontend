import React, { useState } from 'react';
import { Save, ArrowLeft, Plus, Trash2, Settings, Image, Music, Gift, HelpCircle, User } from 'lucide-react';

export default function AdminPanel({ initialContent, apiUrl, onClose }) {
  const [activeTab, setActiveTab] = useState('general');
  const [content, setContent] = useState(initialContent);
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [saveStatus, setSaveStatus] = useState({ loading: false, success: '', error: '' });

  // Manejadores generales de campos simples
  const handleFieldChange = (field, value) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  // Manejadores de Memories (Recuerdos)
  const handleMemoryChange = (id, field, value) => {
    const updatedMemories = content.memories.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    setContent((prev) => ({ ...prev, memories: updatedMemories }));
  };

  const addMemory = () => {
    const newId = content.memories.length > 0 ? Math.max(...content.memories.map(m => m.id)) + 1 : 1;
    const newMemory = {
      id: newId,
      date: 'Nueva Fecha',
      title: 'Nuevo Recuerdo',
      description: 'Describe la anécdota...',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600'
    };
    setContent((prev) => ({ ...prev, memories: [...prev.memories, newMemory] }));
  };

  const removeMemory = (id) => {
    setContent((prev) => ({ ...prev, memories: prev.memories.filter((m) => m.id !== id) }));
  };

  // Manejadores de Wishes (Deseos/Sobres)
  const handleWishChange = (id, field, value) => {
    const updatedWishes = content.wishes.map((w) =>
      w.id === id ? { ...w, [field]: value } : w
    );
    setContent((prev) => ({ ...prev, wishes: updatedWishes }));
  };

  const addWish = () => {
    const newId = content.wishes.length > 0 ? Math.max(...content.wishes.map(w => w.id)) + 1 : 1;
    const newWish = {
      id: newId,
      emoji: '💝',
      title: 'Nuevo Detalle',
      content: 'Escribe el mensaje de la carta aquí...'
    };
    setContent((prev) => ({ ...prev, wishes: [...prev.wishes, newWish] }));
  };

  const removeWish = (id) => {
    setContent((prev) => ({ ...prev, wishes: prev.wishes.filter((w) => w.id !== id) }));
  };

  // Manejadores de Trivia
  const handleTriviaChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      trivia: { ...prev.trivia, [field]: value }
    }));
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = content.trivia.questions.map((q, idx) =>
      idx === qIndex ? { ...q, [field]: value } : q
    );
    setContent((prev) => ({
      ...prev,
      trivia: { ...prev.trivia, questions: updatedQuestions }
    }));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = content.trivia.questions.map((q, idx) => {
      if (idx === qIndex) {
        const updatedOptions = q.options.map((opt, oIdx) =>
          oIdx === oIndex ? value : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setContent((prev) => ({
      ...prev,
      trivia: { ...prev.trivia, questions: updatedQuestions }
    }));
  };

  // Guardar en el Servidor
  const handleSave = async () => {
    setSaveStatus({ loading: true, success: '', error: '' });
    try {
      const response = await fetch(`${apiUrl}/api/admin/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword,
          content: content
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSaveStatus({ loading: false, success: 'Configuración guardada y desplegada exitosamente', error: '' });
        setTimeout(() => setSaveStatus(prev => ({ ...prev, success: '' })), 4000);
      } else {
        throw new Error(data.message || 'Error guardando datos');
      }
    } catch (err) {
      setSaveStatus({ loading: false, success: '', error: err.message });
    }
  };

  return (
    <div className="login-screen" style={{ overflowY: 'auto', padding: '40px 20px' }}>
      
      {/* Contenedor Principal Panel de Admin */}
      <div className="glass-card" style={{ width: '100%', maxWidth: '800px', padding: '36px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 10 }}>
        
        {/* Cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
          <div>
            <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings className="w-6 h-6 text-yellow-400" />
              Panel de Configuración
            </h1>
            <p className="text-slate-400" style={{ fontSize: '0.8rem', fontWeight: 300, marginTop: '4px' }}>
              Personaliza el contenido de la web de cumpleaños. Los cambios se guardarán directamente en el servidor.
            </p>
          </div>

          <button onClick={onClose} className="btn-gold" style={{ width: 'auto', padding: '8px 18px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a la Web
          </button>
        </div>

        {/* Credencial de Seguridad del Admin */}
        <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(255, 255, 255, 0.01)' }}>
          <span className="input-label" style={{ margin: 0 }}>Password Admin:</span>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Clave de guardado (admin123)"
            className="input-premium"
            style={{ maxWidth: '200px', padding: '8px 16px', fontSize: '0.85rem' }}
          />
          <span className="text-slate-500" style={{ fontSize: '0.75rem', flex: 1 }}>Requerido para autorizar el guardado en el servidor.</span>
        </div>

        {/* Pestañas de cristal del Panel */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', borderBottom: '1px solid var(--color-border)', paddingBottom: '1px' }}>
          {[
            { id: 'general', label: 'General', icon: User },
            { id: 'multimedia', label: 'Multimedia', icon: Music },
            { id: 'recuerdos', label: 'Recuerdos', icon: Image },
            { id: 'deseos', label: 'Sobres', icon: Gift },
            { id: 'trivia', label: 'Trivia', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  border: 'none',
                  background: isActive ? 'rgba(223, 177, 91, 0.1)' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--color-gold)' : '2px solid transparent',
                  color: isActive ? 'var(--color-gold)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px'
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenido de la pestaña activa */}
        <div style={{ minHeight: '300px', padding: '10px 0' }}>
          
          {/* Pestaña: GENERAL */}
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group">
                <label className="input-label">Nombre del cumpleañero/a</label>
                <input
                  type="text"
                  value={content.birthdayName}
                  onChange={(e) => handleFieldChange('birthdayName', e.target.value)}
                  className="input-premium"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Fecha de Cumpleaños (YYYY-MM-DD)</label>
                <input
                  type="text"
                  value={content.birthdayDate}
                  onChange={(e) => handleFieldChange('birthdayDate', e.target.value)}
                  className="input-premium"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Pregunta Secreta de Acceso</label>
                <input
                  type="text"
                  value={content.secretQuestion}
                  onChange={(e) => handleFieldChange('secretQuestion', e.target.value)}
                  className="input-premium"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Respuesta Secreta Correcta (en minúsculas y sin acentos)</label>
                <input
                  type="text"
                  value={content.secretAnswer}
                  onChange={(e) => handleFieldChange('secretAnswer', e.target.value)}
                  className="input-premium"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Texto de Pista (Si falla la respuesta)</label>
                <input
                  type="text"
                  value={content.hintText}
                  onChange={(e) => handleFieldChange('hintText', e.target.value)}
                  className="input-premium"
                />
              </div>
            </div>
          )}

          {/* Pestaña: MULTIMEDIA */}
          {activeTab === 'multimedia' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group">
                <label className="input-label">URL del Video (MP4 directo o Enlace Embed de YouTube)</label>
                <input
                  type="text"
                  value={content.videoUrl}
                  onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
                  className="input-premium"
                />
                <span className="text-slate-500" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  Nota: Para YouTube usa la URL de inserción (ej. <code>https://www.youtube.com/embed/TU_ID_VIDEO</code>).
                </span>
              </div>

              <div style={{ display: 'flex', itemsCenter: 'center', gap: '10px', margin: '6px 0' }}>
                <input
                  type="checkbox"
                  id="isVideoEmbed"
                  checked={content.isVideoEmbed}
                  onChange={(e) => handleFieldChange('isVideoEmbed', e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="isVideoEmbed" className="text-slate-300" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                  ¿Es un video incrustado (YouTube / Vimeo)? (Marca esta opción si usas YouTube)
                </label>
              </div>

              <div className="form-group">
                <label className="input-label">URL de la Canción de Fondo (Formato .MP3)</label>
                <input
                  type="text"
                  value={content.backgroundMusicUrl}
                  onChange={(e) => handleFieldChange('backgroundMusicUrl', e.target.value)}
                  className="input-premium"
                />
              </div>
            </div>
          )}

          {/* Pestaña: RECUERDOS (SCRAPBOOK) */}
          {activeTab === 'recuerdos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="input-label" style={{ margin: 0 }}>Fotos del Álbum</span>
                <button onClick={addMemory} className="btn-gold" style={{ width: 'auto', padding: '6px 14px', fontSize: '0.75rem' }}>
                  <Plus className="w-3.5 h-3.5" />
                  Añadir Recuerdo
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {content.memories.map((m, idx) => (
                  <div key={m.id} className="glass-card" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
                    <button 
                      onClick={() => removeMemory(m.id)}
                      style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Eliminar recuerdo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <h4 className="font-serif" style={{ color: 'var(--color-gold)', marginBottom: '16px', fontSize: '1rem' }}>
                      Recuerdo #{idx + 1}
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="sm:grid-cols-2">
                      <div className="form-group">
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>Título</label>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => handleMemoryChange(m.id, 'title', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>Fecha</label>
                        <input
                          type="text"
                          value={m.date}
                          onChange={(e) => handleMemoryChange(m.id, 'date', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>URL de la Imagen</label>
                        <input
                          type="text"
                          value={m.image}
                          onChange={(e) => handleMemoryChange(m.id, 'image', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>Descripción / Anécdota</label>
                        <textarea
                          value={m.description}
                          onChange={(e) => handleMemoryChange(m.id, 'description', e.target.value)}
                          className="input-premium"
                          rows="2"
                          style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pestaña: DESEOS */}
          {activeTab === 'deseos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="input-label" style={{ margin: 0 }}>Sobres / Cartas del Cofre</span>
                <button onClick={addWish} className="btn-gold" style={{ width: 'auto', padding: '6px 14px', fontSize: '0.75rem' }}>
                  <Plus className="w-3.5 h-3.5" />
                  Añadir Sobre
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {content.wishes.map((w, idx) => (
                  <div key={w.id} className="glass-card" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
                    <button 
                      onClick={() => removeWish(w.id)}
                      style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Eliminar sobre"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <h4 className="font-serif" style={{ color: 'var(--color-gold)', marginBottom: '16px', fontSize: '1rem' }}>
                      Sobre #{idx + 1}
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="sm:grid-cols-3">
                      <div className="form-group" style={{ maxWidth: '80px' }}>
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>Emoji</label>
                        <input
                          type="text"
                          value={w.emoji}
                          onChange={(e) => handleWishChange(w.id, 'emoji', e.target.value)}
                          className="input-premium"
                          style={{ textAlign: 'center', fontSize: '1.2rem' }}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>Título de la Carta</label>
                        <input
                          type="text"
                          value={w.title}
                          onChange={(e) => handleWishChange(w.id, 'title', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 3' }}>
                        <label className="input-label" style={{ fontSize: '0.65rem' }}>Contenido del Mensaje</label>
                        <textarea
                          value={w.content}
                          onChange={(e) => handleWishChange(w.id, 'content', e.target.value)}
                          className="input-premium"
                          rows="4"
                          style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pestaña: TRIVIA */}
          {activeTab === 'trivia' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  id="triviaEnabled"
                  checked={content.trivia.enabled}
                  onChange={(e) => handleTriviaChange('enabled', e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="triviaEnabled" className="text-slate-300" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                  Habilitar módulo de trivia interactivo
                </label>
              </div>

              <div className="form-group">
                <label className="input-label">Mensaje al Completar Trivia</label>
                <input
                  type="text"
                  value={content.trivia.congratulationsMessage}
                  onChange={(e) => handleTriviaChange('congratulationsMessage', e.target.value)}
                  className="input-premium"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Carta Secreta Desbloqueada (Mensaje final)</label>
                <textarea
                  value={content.trivia.finalLetter}
                  onChange={(e) => handleTriviaChange('finalLetter', e.target.value)}
                  className="input-premium"
                  rows="4"
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border)', margin: '10px 0' }}></div>

              <span className="input-label">Preguntas de la Trivia ({content.trivia.questions.length})</span>

              {content.trivia.questions.map((q, qIdx) => (
                <div key={qIdx} className="glass-card" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 className="font-serif" style={{ color: 'var(--color-gold)', marginBottom: '16px', fontSize: '0.95rem' }}>
                    Pregunta #{qIdx + 1}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                      <label className="input-label" style={{ fontSize: '0.65rem' }}>Enunciado de la Pregunta</label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
                        className="input-premium"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }} className="sm:grid-cols-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="form-group">
                          <label className="input-label" style={{ fontSize: '0.65rem' }}>Opción {oIdx + 1}</label>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                            className="input-premium"
                            style={{ fontSize: '0.85rem' }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="form-group" style={{ maxWidth: '280px' }}>
                      <label className="input-label" style={{ fontSize: '0.65rem' }}>Índice de Respuesta Correcta (1 a 4)</label>
                      <select
                        value={q.correctAnswerIndex}
                        onChange={(e) => handleQuestionChange(qIdx, 'correctAnswerIndex', parseInt(e.target.value))}
                        className="input-premium"
                        style={{ background: '#0a0d16', cursor: 'pointer' }}
                      >
                        <option value={0}>Opción 1</option>
                        <option value={1}>Opción 2</option>
                        <option value={2}>Opción 3</option>
                        <option value={3}>Opción 4</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Alertas de Estado y Botón de Guardado */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {saveStatus.success && (
            <p className="error-container" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
              ✓ {saveStatus.success}
            </p>
          )}

          {saveStatus.error && (
            <p className="error-container">
              ⚠️ {saveStatus.error}
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={saveStatus.loading}
            className="btn-gold"
            style={{ width: '100%', height: '50px' }}
          >
            {saveStatus.loading ? (
              <span>Guardando cambios...</span>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Configuración en Servidor
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
