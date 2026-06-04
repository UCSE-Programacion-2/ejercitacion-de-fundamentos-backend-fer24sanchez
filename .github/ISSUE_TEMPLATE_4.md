---
title: "Implementar GET /frutas/buscar"
labels: "auto-issue"
---
Debes crear el endpoint `GET /frutas/buscar` que:
1. Obtenga el parámetro de consulta (query parameter) `nombre` de la URL (`req.query.nombre`).
2. Lea el archivo `data/frutas.json` utilizando el módulo nativo `fs`.
3. Filtre la lista de frutas para quedarse solo con aquellas cuyo nombre contenga la cadena buscada (se recomienda pasarlo a minúsculas para ignorar mayúsculas).
4. Devuelva el arreglo de resultados con código de estado HTTP `200`. Si no hay coincidencias, debe devolver un arreglo vacío `[]`.

**IMPORTANTE**: En `server.js`, esta ruta debe ser definida **antes** de la ruta `GET /frutas/:id`, ya que de lo contrario Express capturará la palabra "buscar" asumiendo que es un `:id`.

_Para verificarlo, corre `npm test` o usa la petición GET con query en `api.http`._
