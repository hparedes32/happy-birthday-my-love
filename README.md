# happy-birthday-my-love 💕

Página-regalo: se abre con un corazón para tocar, después una galería de
fotos de ustedes dos, y termina con una carta. Pensada para compartir con
un código QR en una tarjetita física.

## 1. Personalizarla

Todo el contenido editable está en un solo archivo: [`src/lib/content.ts`](src/lib/content.ts).
Ahí cambiás:

- Su nombre y el tuyo
- El texto de la primera pantalla
- Las fotos (agregalas en `public/photos/` con los nombres `1.jpg`, `2.jpg`, etc. — mientras no estén, se ve un cartel avisando que falta esa foto, así que podés probar todo el flujo antes de tener las fotos definitivas)
- El texto completo de la carta
- Opcional: la fecha en que empezaron a salir (para mostrar "llevamos X días juntos")
- Opcional: una canción de fondo (`public/music/song.mp3`) — arranca sola apenas toca el corazón para abrir el regalo. Si no la agregás, no aparece ningún botón de música

No hace falta tocar ningún otro archivo para personalizar el contenido.

## 2. Correrla en local

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). Probala también desde el celular (conectado a la misma red) para ver cómo se siente, ya que así es como la va a abrir ella.

## 3. Deployarla en Vercel

1. Subí el proyecto a un repo de GitHub.
2. Entrá a [vercel.com/new](https://vercel.com/new), importá el repo y hacé deploy (no necesita variables de entorno ni configuración especial).
3. Vercel te da una URL tipo `https://tu-proyecto.vercel.app`. Esa es la URL final.

## 4. Generar el QR para la tarjetita

Con la URL que te dio Vercel:

```bash
npm run qr -- https://tu-proyecto.vercel.app
```

Esto crea `qr.png` en la raíz del proyecto: un QR grande y con buena corrección de errores, listo para usar donde quieras (por ejemplo, para armar tu propia tarjeta a mano).

## 5. Generar la tarjetita lista para imprimir

Si preferís no armar la tarjeta vos, con la misma URL:

```bash
npm run card -- https://tu-proyecto.vercel.app
```

Esto crea `tarjeta.pdf` en la raíz del proyecto: una hoja A4 con una tarjetita de 10x15cm centrada (con su nombre, el QR y marcas de corte en las esquinas). Al imprimir, elegí **"Tamaño real" / 100%** (no "ajustar a la página"), así el QR queda del tamaño correcto y escanea bien.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + pdf-lib.
