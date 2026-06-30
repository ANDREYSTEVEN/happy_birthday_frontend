import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, Award, ArrowRight, RotateCcw, LockOpen } from 'lucide-react';

export default function TriviaQuiz({ triviaData }) {
  if (!triviaData || !triviaData.enabled) return null;

  const { questions, finalLetter, congratulationsMessage } = triviaData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const isAnswerCorrect = optionIndex === questions[currentQuestionIndex].correctAnswerIndex;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.8 },
        colors: ['#dfb15b', '#ffffff']
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      if (score + (isCorrect ? 1 : 0) === questions.length) {
        const end = Date.now() + 2 * 1000;
        (function frame() {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: ['#dfb15b', '#ffffff', '#ffd54f']
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: ['#dfb15b', '#ffffff', '#ffd54f']
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="trivia-section">
      
      {/* Encabezado */}
      <div className="section-header">
        <div className="section-icon-circle" style={{ color: '#e2b857' }}>
          <HelpCircle className="w-5 h-5" />
        </div>
        <h2 className="section-title">El Desafío del Recuerdo</h2>
        <p className="section-subtitle">
          Responde correctamente a estas preguntas sobre nosotros para desbloquear una carta secreta.
        </p>
      </div>

      {/* Tarjeta del Juego */}
      <div className="glass-card trivia-card">
        
        {/* Línea dorada decorativa */}
        <div className="trivia-top-line"></div>

        {!quizFinished ? (
          // Cuerpo del Quiz
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Cabecera del Quiz */}
            <div className="trivia-status">
              <span>Desafío {currentQuestionIndex + 1} de {questions.length}</span>
              <span>Aciertos: {score}</span>
            </div>

            {/* Barra de progreso */}
            <div className="trivia-progress-bar">
              <div 
                className="trivia-progress-fill"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Pregunta */}
            <h3 className="trivia-question">
              {questions[currentQuestionIndex].question}
            </h3>

            {/* Opciones */}
            <div className="options-grid">
              {questions[currentQuestionIndex].options.map((option, idx) => {
                let btnStyleClass = "";
                if (isAnswered) {
                  if (idx === questions[currentQuestionIndex].correctAnswerIndex) {
                    btnStyleClass = "option-btn-correct";
                  } else if (selectedOption === idx) {
                    btnStyleClass = "option-btn-incorrect";
                  } else {
                    btnStyleClass = "option-btn-disabled";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(idx)}
                    className={`option-btn ${btnStyleClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback footer */}
            {isAnswered && (
              <div className="trivia-feedback-panel">
                <div>
                  {isCorrect ? (
                    <span className="feedback-text-success">✓ Correcto</span>
                  ) : (
                    <span className="feedback-text-fail">✗ Casi...</span>
                  )}
                </div>

                <button 
                  onClick={handleNext}
                  className="btn-gold trivia-btn-next"
                >
                  Siguiente
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        ) : (
          // Vista Fin de Juego (Desbloqueo de carta secreta)
          <div className="trivia-finished-card">
            {score === questions.length ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                <div className="finished-icon-container">
                  <Award className="w-6 h-6 animate-bounce" />
                </div>
                
                <h3 className="finished-title">¡Desafío Superado!</h3>
                <p className="finished-desc">
                  {congratulationsMessage}
                </p>

                {/* Pergamino Secreto Elegante */}
                <div className="unlocked-parchment animate-[scaleUp_0.4s_ease-out]">
                  
                  <div className="parchment-lock">
                    <LockOpen className="w-8 h-8" />
                  </div>

                  <h4 className="parchment-tag">
                    <span className="parchment-ping-dot"></span>
                    CARTA SECRETA DESBLOQUEADA
                  </h4>

                  <p className="parchment-text">
                    "{finalLetter}"
                  </p>

                  <div className="parchment-signature">
                    Con cariño ❤️
                  </div>
                </div>
              </div>
            ) : (
              // Reintento
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <h3 className="finished-title">Casi lo logras</h3>
                <p className="finished-desc" style={{ marginBottom: '16px' }}>
                  Obtuviste {score} de {questions.length} respuestas correctas. Para abrir la carta secreta, debes tener todas correctas.
                </p>
                <button
                  onClick={resetQuiz}
                  className="btn-gold"
                  style={{ width: 'auto' }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reintentar Juego
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
