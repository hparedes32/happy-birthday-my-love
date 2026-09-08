// Genera una imagen QR lista para imprimir, apuntando a la URL que le pases.
//
// Uso (después de deployar en Vercel):
//   node scripts/generate-qr.mjs https://tu-proyecto.vercel.app
//
// Esto crea qr.png en la raíz del proyecto: un QR grande (1000x1000) con
// buen margen y corrección de errores alta, para que salga nítido impreso
// en una tarjetita chica.

import QRCode from "qrcode";
import path from "node:path";

const url = process.argv[2];

if (!url) {
  console.error("Falta la URL. Uso: node scripts/generate-qr.mjs https://tu-proyecto.vercel.app");
  process.exit(1);
}

const outPath = path.join(process.cwd(), "qr.png");

await QRCode.toFile(outPath, url, {
  type: "png",
  width: 1000,
  margin: 2,
  errorCorrectionLevel: "H",
  color: {
    dark: "#9f1239",
    light: "#ffffff",
  },
});

console.log(`Listo! QR generado en: ${outPath}`);
console.log(`Apunta a: ${url}`);
