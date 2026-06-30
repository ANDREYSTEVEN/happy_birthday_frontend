// Configuración centralizada para la personalización de la página web de cumpleaños.
// Puedes cambiar estos textos de manera fácil y rápida aquí sin romper el código.

export const CONFIG = {
  // 1. Información General
  birthdayName: "Mi Persona Favorita", // Cambiar por su nombre (ej. "Sofía", "Carlos")
  birthdayDate: "2026-06-30", // Fecha en formato YYYY-MM-DD para calcular cuenta regresiva
  
  // 2. Sistema de Acceso (Login)
  // La respuesta secreta se comparará de forma inteligente (sin importar mayúsculas, tildes o espacios)
  secretQuestion: "¿En qué ciudad tuvimos nuestra primera cita o salida especial?",
  secretAnswer: "Bogota", // Respuesta esperada (ej. "Bogotá", "bogota")
  hintText: "Pista: Comienza con 'B' y es la capital de Colombia... 😉", // Pista en caso de que falle
  
  // 3. Canción de Fondo
  // Debe ser un archivo .mp3 en la carpeta public/ o una URL directa.
  // Colocaremos una música instrumental hermosa por defecto.
  backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Puedes reemplazarlo con un archivo local (ej. "/mi-cancion.mp3")
  
  // 4. Video Sorpresa
  // Si subes un archivo local a public/video.mp4 usa "/video.mp4"
  // Si usas un enlace de YouTube usa la versión embed (ej. "https://www.youtube.com/embed/VIDEO_ID")
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Video de prueba. Cambiar por el tuyo.
  isVideoEmbed: false, // Cambiar a true si usas YouTube / Vimeo embed
  
  // 5. Álbum de Recuerdos (Scrapbook / Timeline)
  // Reemplaza las URL de fotos con las tuyas (puedes poner fotos locales en public/ fotos/foto1.jpg, etc.)
  memories: [
    {
      id: 1,
      date: "14 de Febrero, 2024",
      title: "El comienzo de todo 🌸",
      description: "Aquel café por la tarde donde conversamos por horas y el tiempo voló. Supe desde ese momento que serías alguien muy especial en mi vida.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      date: "05 de Julio, 2024",
      title: "Nuestro primer viaje ✈️",
      description: "La escapada de fin de semana. Perdidos buscando ese mirador secreto, riendo bajo la lluvia. Uno de mis recuerdos favoritos.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      date: "31 de Diciembre, 2024",
      title: "Recibiendo el Año Nuevo ✨",
      description: "Brindando por todo lo vivido y haciendo promesas para el futuro. Tu sonrisa iluminaba más que los fuegos artificiales de medianoche.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      date: "Hace unos meses",
      title: "Tardes de risas infinitas 🍕",
      description: "Nuestras noches de pizza y películas donde siempre terminamos hablando de cualquier locura en lugar de ver la película. Gracias por estar siempre.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop"
    }
  ],
  
  // 6. Frasco de Deseos (Cartas / Cupones virtuales)
  wishes: [
    {
      id: 1,
      emoji: "✉️",
      title: "Un deseo de Salud y Felicidad",
      content: "Deseo que este año que comienzas esté lleno de salud, paz mental y sonrisas diarias. Que logres cada meta que te propongas, porque tienes el talento y el corazón para conquistar el mundo. ¡Estaré aquí para celebrarlo contigo!"
    },
    {
      id: 2,
      emoji: "🎟️",
      title: "Vale por un Abrazo Gigante",
      content: "Este cupón virtual es válido para ser canjeado por el abrazo más fuerte y largo del mundo, además de un helado de tu sabor favorito. ¡Válido por tiempo ilimitado!"
    },
    {
      id: 3,
      emoji: "✨",
      title: "Vale por una Tarde de Pelis",
      content: "Este cupón te da derecho a elegir la película, las botanas (las compro yo) y adueñarte del control remoto por una tarde entera. ¡Tú mandas!"
    },
    {
      id: 4,
      emoji: "💝",
      title: "Mi eterna Gratitud",
      content: "Gracias por tu paciencia, tu luz y por hacer que los días grises sean de colores. Eres una persona increíble y tenerte cerca es uno de mis mayores regalos. ¡Feliz Cumpleaños!"
    }
  ],
  
  // 7. Preguntas de la Trivia (Para desbloquear el regalo sorpresa final)
  trivia: {
    enabled: true, // Si quieres activar o no la sección de trivia
    congratulationsMessage: "¡Eres increíble! Has desbloqueado el regalo final: Una carta que escribí con todo mi corazón para ti. ❤️",
    finalLetter: "Querida persona especial, hoy en tu cumpleaños quiero recordarte lo valioso/a que eres. Cada momento compartido es un tesoro para mí. Espero que pases un día maravilloso, rodeado/a de amor y felicidad. ¡Te quiero muchísimo y que cumplas muchos años más!",
    questions: [
      {
        question: "¿Qué es lo que más solemos discutir en plan de broma?",
        options: [
          "Quién come más rápido",
          "Qué película ver en Netflix",
          "Quién es el más impuntual",
          "Quién tiene el mejor gusto musical"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "Si pudiéramos teletransportarnos ahora mismo, ¿a dónde iríamos?",
        options: [
          "A una cabaña en las montañas heladas",
          "A una playa relajante con agua cristalina",
          "A explorar una gran ciudad de noche",
          "Al parque de diversiones más extremo"
        ],
        correctAnswerIndex: 1
      },
      {
        question: "¿Cuál es mi postre favorito que siempre quiero compartir contigo?",
        options: [
          "Tarta de chocolate",
          "Helado de vainilla",
          "Pie de limón",
          "Flan casero"
        ],
        correctAnswerIndex: 0
      }
    ]
  }
};
