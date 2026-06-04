---
title: "Implementar GET /frutas/:id"
labels: "auto-issue"
---
Debes crear el endpoint `GET /frutas/:id` que:
1. Extraiga el parámetro `id` de la ruta y lo convierta a un número entero.
2. Lea los datos desde `data/frutas.json` utilizando `fs`.
3. Busque y devuelva la fruta que coincida con ese `id` con código de estado `200`.
4. Si la fruta no existe en el arreglo, devuelva `{ error: "Fruta no encontrada" }` con código HTTP `404`.

_Para verificarlo, corre `npm test` o usa las peticiones correspondientes en `api.http`._
