// Genera una tarjetita imprimible en PDF con el QR de la página, lista para
// cortar y regalar en papel.
//
// Uso (después de deployar en Vercel):
//   npm run card -- https://tu-proyecto.vercel.app
//
// Esto crea tarjeta.pdf en la raíz del proyecto: una hoja A4 con la tarjeta
// centrada (10x15cm) y marcas en las esquinas para guiarte al cortar. El
// nombre que aparece es el que pusiste en src/lib/content.ts (girlfriendName).
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
const ROSE_SOFT = rgb(0.96, 0.75, 0.8);
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
  borderColor: ROSE_SOFT,
  borderWidth: 1,
});

// Fila de puntitos decorativos (arriba y, en espejo, abajo).
function dotsRow(y) {
  const radii = [1.1, 1.6, 2.1, 1.6, 1.1].map((r) => r * MM);
  const gap = 6 * MM;
  const totalW = gap * (radii.length - 1);
  radii.forEach((r, i) => {
    page.drawEllipse({
      x: originX + CARD_W / 2 - totalW / 2 + i * gap,
      y: originY + y,
      xScale: r,
      yScale: r,
      color: i === 2 ? ROSE_DARK : ROSE_MED,
    });
  });
}
dotsRow(128 * MM);
dotsRow(16 * MM);

// Textos.
drawCentered(`Para ${content.girlfriendName}`, italicFont, 24, 108 * MM, ROSE_DARK);
drawCentered("Escaneá para abrir tu regalo", sansFont, 10, 99 * MM, ROSE_MED);

// QR centrado.
const QR_SIZE = 58 * MM;
page.drawImage(qrImage, {
  x: originX + (CARD_W - QR_SIZE) / 2,
  y: originY + 34 * MM,
  width: QR_SIZE,
  height: QR_SIZE,
});

drawCentered("con la cámara de tu celular", sansFont, 9, 25 * MM, GRAY);

const pdfBytes = await pdfDoc.save();
const outPath = path.join(process.cwd(), "tarjeta.pdf");
await fs.writeFile(outPath, pdfBytes);

console.log(`Listo! Tarjeta generada en: ${outPath}`);
console.log(`Apunta a: ${url}`);
console.log(`Para: ${content.girlfriendName}`);
console.log(`Al imprimir: elegí "Tamaño real" / 100% (no "ajustar a la página").`);
