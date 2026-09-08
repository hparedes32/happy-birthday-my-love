// Genera una tarjetita imprimible en PDF con el QR de la página, lista para
// cortar y regalar en papel.
//
// Uso (después de deployar en Vercel):
//   npm run card -- https://tu-proyecto.vercel.app
//
// Esto crea tarjeta.pdf en la raíz del proyecto: una hoja A4 con la tarjeta
// centrada (10x15cm) y marcas en las esquinas para guiarte al cortar. El
// título y subtítulo salen de src/lib/content.ts (cardTitle / cardSubtitle).
// El corazón y la tortita son los emojis reales (renderizados a imagen una
// sola vez y guardados en scripts/assets/) — no dibujitos vectoriales, ya
// que las fuentes estándar de PDF no tienen glifos de emoji a color.
//
// Al imprimir: elegí "Tamaño real" / 100% (NO "ajustar a la página" ni
// "encoger para ajustar"), así el QR queda del tamaño correcto y escanea
// bien apenas se acerque el celular.

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import fs from "node:fs/promises";
import path from "node:path";
import { content } from "../src/lib/content.ts";

const url = process.argv[2];

if (!url) {
  console.error("Falta la URL. Uso: npm run card -- https://tu-proyecto.vercel.app");
  process.exit(1);
}

const MM = 2.834645669; // puntos por milímetro (1pt = 1/72 in)

// Tamaño de la tarjeta: 100 x 150mm (como una postal chica).
const CARD_W = 100 * MM;
const CARD_H = 150 * MM;

const ROSE_DARK = rgb(0.62, 0.07, 0.22);
const ROSE_MED = rgb(0.88, 0.29, 0.42);
const ROSE_BG = rgb(1, 0.9, 0.94); // fondo rosadito de toda la tarjeta
const GRAY = rgb(0.45, 0.4, 0.41);
const TICK_GRAY = rgb(0.6, 0.6, 0.6);

const qrPng = await QRCode.toBuffer(url, {
  type: "png",
  width: 800,
  margin: 1,
  errorCorrectionLevel: "H",
  color: { dark: "#9f1239", light: "#ffffff" },
});

const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([595.28, 841.89]); // A4
const { width: pageW, height: pageH } = page.getSize();

// Origen (esquina inferior izquierda) de la tarjeta, centrada en la hoja.
const originX = (pageW - CARD_W) / 2;
const originY = (pageH - CARD_H) / 2;

const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
const sansFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const qrImage = await pdfDoc.embedPng(qrPng);

const assetsDir = path.join(process.cwd(), "scripts", "assets");
const heartPng = await fs.readFile(path.join(assetsDir, "heart.png"));
const cakePng = await fs.readFile(path.join(assetsDir, "cake.png"));
const heartImage = await pdfDoc.embedPng(heartPng);
const cakeImage = await pdfDoc.embedPng(cakePng);

function drawCentered(text, font, size, y, color) {
  const textWidth = font.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: originX + (CARD_W - textWidth) / 2,
    y: originY + y,
    size,
    font,
    color,
  });
}

/** Dibuja una imagen (los emojis) centrada en (cx, cy), respetando su relación de aspecto real. */
function drawEmoji(image, cx, cy, targetHeight) {
  const h = targetHeight;
  const w = h * (image.width / image.height);
  page.drawImage(image, { x: cx - w / 2, y: cy - h / 2, width: w, height: h });
}

// Fondo rosadito de toda la tarjeta (va primero, atrás de todo lo demás).
page.drawRectangle({
  x: originX,
  y: originY,
  width: CARD_W,
  height: CARD_H,
  color: ROSE_BG,
});

// Marcas de corte (una crucecita en cada esquina, como en imprenta).
const TICK = 8;
const GAP = 3;
function cropMark(cx, cy, dx, dy) {
  page.drawLine({
    start: { x: cx + dx * GAP, y: cy },
    end: { x: cx + dx * (GAP + TICK), y: cy },
    thickness: 0.75,
    color: TICK_GRAY,
  });
  page.drawLine({
    start: { x: cx, y: cy + dy * GAP },
    end: { x: cx, y: cy + dy * (GAP + TICK) },
    thickness: 0.75,
    color: TICK_GRAY,
  });
}
cropMark(originX, originY, -1, -1);
cropMark(originX + CARD_W, originY, 1, -1);
cropMark(originX, originY + CARD_H, -1, 1);
cropMark(originX + CARD_W, originY + CARD_H, 1, 1);

// Marco decorativo fino, un poco adentro del borde de corte.
const INSET = 6 * MM;
page.drawRectangle({
  x: originX + INSET,
  y: originY + INSET,
  width: CARD_W - INSET * 2,
  height: CARD_H - INSET * 2,
  borderColor: ROSE_MED,
  borderWidth: 1,
});

// Corazón arriba, tortita abajo.
drawEmoji(heartImage, originX + CARD_W / 2, originY + 128 * MM, 20 * MM);
drawEmoji(cakeImage, originX + CARD_W / 2, originY + 15 * MM, 18 * MM);

// Textos.
drawCentered(content.cardTitle, italicFont, 21, 106 * MM, ROSE_DARK);
drawCentered(content.cardSubtitle, sansFont, 10, 97 * MM, ROSE_MED);

// QR centrado.
const QR_SIZE = 56 * MM;
page.drawImage(qrImage, {
  x: originX + (CARD_W - QR_SIZE) / 2,
  y: originY + 36 * MM,
  width: QR_SIZE,
  height: QR_SIZE,
});

drawCentered("con la cámara de tu celular", sansFont, 9, 27 * MM, GRAY);

const pdfBytes = await pdfDoc.save();
const outPath = path.join(process.cwd(), "tarjeta.pdf");
await fs.writeFile(outPath, pdfBytes);

console.log(`Listo! Tarjeta generada en: ${outPath}`);
console.log(`Apunta a: ${url}`);
console.log(`Título: ${content.cardTitle}`);
console.log(`Al imprimir: elegí "Tamaño real" / 100% (no "ajustar a la página").`);
