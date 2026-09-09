// ============================================================================
// TODO EL CONTENIDO PERSONAL DEL REGALO VIVE ACÁ.
// Editá este archivo con lo tuyo: nombre, fotos y la carta.
// No hace falta tocar ningún otro archivo del proyecto para personalizarlo.
// ============================================================================

export const content = {
  // El nombre de tu novia. Aparece en la pantalla de inicio y en la carta.
  girlfriendName: "Mi amor",

  // Cómo vas a firmar la carta (tu nombre, un apodo, lo que quieras).
  yourName: "Tu nombre",

  // Frase que aparece debajo del nombre en la primera pantalla.
  introSubtitle: "Tengo un regalito para vos, tocá el corazón...",

  // Fecha en la que empezaron a salir, formato "AAAA-MM-DD" (ej: "2023-02-14").
  // Si la dejás en null, no se muestra el contador de "llevamos X días juntos".
  relationshipStartDate: null as string | null,

  // --------------------------------------------------------------------------
  // FOTOS
  // Agregá tus fotos reales en la carpeta /public/photos/ con estos mismos
  // nombres de archivo (1.jpg, 2.jpg, 3.jpg, 4.jpg) y van a aparecer solas.
  // Si usás .png o .webp, cambiá la extensión acá abajo para que coincida.
  // Podés agregar o sacar fotos del array libremente (no hay límite).
  // Mientras no pongas la foto real, se muestra un cartel avisando que falta.
  // --------------------------------------------------------------------------
  photos: [
    { src: "/photos/2.JPEG", caption: "De los primeros viajecitos juntitos" },
    { src: "/photos/3.JPEG", caption: "Abrazaditos siempre" },
    { src: "/photos/1.JPEG", caption: "Nuestra primera fotito juntos" },
    { src: "/photos/4.JPEG", caption: "Enseñandote a bicicletear 🤣" },
    { src: "/photos/5.JPEG", caption: "En el candelight de gala 😊🕯️" },
    { src: "/photos/6.JPEG", caption: "La pintora mas linda" },
    { src: "/photos/7.JPEG", caption: "Los tres en camita con papucho 😽" },
    { src: "/photos/8.JPEG", caption: "Mi reina hermosa! 👑" },
    { src: "/photos/9.JPEG", caption: "❤️😍🕯️" },
    { src: "/photos/10.JPEG", caption: "En el cerrito juntos ❤️" },
  ],

  // --------------------------------------------------------------------------
  // LA CARTA
  // Cada elemento del array "letterParagraphs" es un párrafo nuevo.
  // Escribí lo que realmente sentís, no hay límite de largo ni de cantidad
  // de párrafos — podés borrar estos de ejemplo y poner los tuyos.
  // --------------------------------------------------------------------------
  letterSalutation: "Feliz cumple mi vida hermosa 😘❤️🥳",
  letterParagraphs: [
    "Bebe, mi idea era escribirte una cartita pero me gusto mucho esta idea tmb! 😅😊 Queria desearte un muy feliz cumpleaños amor mio! Viste q no soy de escribir mucho pero queria tomarme el tiempo para decirte lo mucho q te amo, lo importante que sos para mi y lo feliz que me haces!",
    "Gracias por cada día sacarme una sonrisa, una carcajada! Por ver la vida de otra manera. Gracias mi compañera, la que esta en todas! En las buenas y en las  dificiles tmb, siempre ahi para apoyarme. Gracias por haber aparecido en mi vida y cambiarla completamente. ",
    "Gracias por haber formado esta hermosa familia junto con papucho 😽 y el hogar q estamos construyendo juntos 🏠",
    "Agradecido de tener la mejor compañera que podría pedir! Espero que festejemos muy lindo hoy 🍾 y que sea el primero de muchos cumpleañitos juntos! 🥳",
  ],
  letterSignature: "Te amo con todo mi corazón... tu amorcito ❤️",

  // --------------------------------------------------------------------------
  // MÚSICA (opcional)
  // Poné un archivo .mp3 en /public/music/song.mp3 (con ese nombre exacto)
  // y la canción arranca sola apenas toque el corazón para abrir el regalo
  // (los navegadores no dejan reproducir sonido antes de que haya un toque
  // del usuario, así que no puede sonar antes de eso). Igual aparece un
  // botón abajo a la derecha por si quiere pausarla o volver a ponerla.
  // Si no agregás ningún archivo, no pasa nada: no aparece ningún botón.
  // --------------------------------------------------------------------------
  songSrc: "/music/song.m4a",

  // --------------------------------------------------------------------------
  // TARJETITA IMPRIMIBLE (npm run card)
  // El título y subtítulo que van en la tarjeta de papel con el QR. Son
  // independientes del resto (podés poner algo distinto a lo de la web).
  // --------------------------------------------------------------------------
  cardTitle: "¡Feliz cumple, bebé!",
  cardSubtitle: "Escaneá para ver tu regalito",
};

export type SiteContent = typeof content;
