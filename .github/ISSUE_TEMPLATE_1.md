---
title: "Implementar GET /frutas"
labels: "auto-issue"
---
Debes crear el endpoint `GET /frutas` que:
1. Lea el archivo `data/frutas.json` utilizando el módulo nativo `fs` (ya sea con `fs.readFileSync` o `fs.promises.readFile`).
2. Parsee el contenido JSON a un arreglo de objetos de JavaScript usando `JSON.parse`.
3. Devuelva este arreglo con código de estado HTTP `200`.

_Para verificarlo, corre `npm test` o usa la petición en `api.http`._
