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
    { src: "/photos/1.jpg", caption: "Nuestra primera foto juntos" },
    { src: "/photos/2.jpg", caption: "Ese viaje que no vamos a olvidar" },
    { src: "/photos/3.jpg", caption: "Riéndonos como siempre" },
    { src: "/photos/4.jpg", caption: "Mi lugar favorito: con vos" },
  ],

  // --------------------------------------------------------------------------
  // LA CARTA
  // Cada elemento del array "letterParagraphs" es un párrafo nuevo.
  // Escribí lo que realmente sentís, no hay límite de largo ni de cantidad
  // de párrafos — podés borrar estos de ejemplo y poner los tuyos.
  // --------------------------------------------------------------------------
  letterSalutation: "Para vos,",
  letterParagraphs: [
    "Escribo esto pensando en todas las razones por las que sos tan importante para mí, y me doy cuenta de que no entran en una sola carta.",
    "Gracias por cada día, por cada risa, por bancarme en los días difíciles y por hacer que los buenos sean todavía mejores.",
    "Esto es solo una excusa para recordarte cuánto te quiero. Esta parte es tuya: reemplazá este texto por lo que de verdad le querés decir.",
  ],
  letterSignature: "Con todo mi amor, Tu nombre",

  // --------------------------------------------------------------------------
  // MÚSICA (opcional)
  // Poné un archivo .mp3 en /public/music/song.mp3 (con ese nombre exacto)
  // y la canción arranca sola apenas toque el corazón para abrir el regalo
  // (los navegadores no dejan reproducir sonido antes de que haya un toque
  // del usuario, así que no puede sonar antes de eso). Igual aparece un
  // botón abajo a la derecha por si quiere pausarla o volver a ponerla.
  // Si no agregás ningún archivo, no pasa nada: no aparece ningún botón.
  // --------------------------------------------------------------------------
  songSrc: "/music/song.mp3",
};

export type SiteContent = typeof content;
