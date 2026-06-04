---
title: "Implementar POST /frutas"
labels: "auto-issue"
---
Debes crear el endpoint `POST /frutas` que:
1. Reciba en el body de la petición (`req.body`) los datos de una nueva fruta.
2. Lea el archivo `data/frutas.json`.
3. Calcule un nuevo `id` (por ejemplo, el id máximo actual + 1).
4. Agregue la nueva fruta a la lista actual de frutas.
5. Sobrescriba el archivo `data/frutas.json` con la lista actualizada usando `fs.writeFileSync` o `fs.promises.writeFile`, recordando convertir el arreglo nuevamente a texto con `JSON.stringify`.
6. Retorne la nueva fruta creada con código HTTP `201`.

_Para verificarlo, corre `npm test` o usa la petición POST en `api.http`._
