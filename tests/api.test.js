const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

const dataFilePath = path.join(__dirname, '../data/frutas.json');
let originalData;

beforeAll(() => {
  // Guardamos el estado original del archivo
  if (fs.existsSync(dataFilePath)) {
    originalData = fs.readFileSync(dataFilePath, 'utf8');
  }
});

afterAll(() => {
  // Restauramos el archivo a su estado original para que otros tests o corridas no fallen
  if (originalData) {
    fs.writeFileSync(dataFilePath, originalData, 'utf8');
  }
});

describe('API de Frutas', () => {

  describe('GET /frutas', () => {
    it('GET /frutas - Retorna todas las frutas', async () => {
      const response = await request(app).get('/frutas');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('nombre');
    });
  });

  describe('GET /frutas/:id', () => {
    it('GET /frutas/:id - Retorna fruta por ID o 404', async () => {
      // 1. Debe existir
      const resValido = await request(app).get('/frutas/1');
      expect(resValido.status).toBe(200);
      expect(resValido.body).toHaveProperty('id', 1);
      expect(resValido.body).toHaveProperty('nombre');

      // 2. No debe existir
      const resInvalido = await request(app).get('/frutas/9999');
      expect(resInvalido.status).toBe(404);
      expect(resInvalido.body).toHaveProperty('error');
    });
  });

  describe('GET /frutas/buscar', () => {
    it('GET /frutas/buscar - Retorna frutas filtradas por query ?nombre=', async () => {
      // 1. Búsqueda con coincidencias
      const resValido = await request(app).get('/frutas/buscar?nombre=Manzanas');
      expect(resValido.status).toBe(200);
      expect(Array.isArray(resValido.body)).toBe(true);
      expect(resValido.body.length).toBeGreaterThan(0);
      expect(resValido.body[0].nombre.toLowerCase()).toContain('manzanas');

      // 2. Búsqueda sin coincidencias
      const resInvalido = await request(app).get('/frutas/buscar?nombre=invento-que-no-existe');
      expect(resInvalido.status).toBe(200);
      expect(Array.isArray(resInvalido.body)).toBe(true);
      expect(resInvalido.body.length).toBe(0);
    });
  });

  describe('POST /frutas', () => {
    it('POST /frutas - Crea una nueva fruta y escribe en el FS', async () => {
      const nuevaFruta = {
        imagen: "🍊",
        nombre: "Naranja",
        importe: 180,
        stock: 100
      };

      const response = await request(app)
        .post('/frutas')
        .send(nuevaFruta);
        
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nombre).toBe("Naranja");

      // Verificar que realmente se escribió en el archivo llamando al GET
      const getResponse = await request(app).get('/frutas');
      const frutas = getResponse.body;
      const frutaAgregada = frutas.find(f => f.nombre === "Naranja");
      expect(frutaAgregada).toBeDefined();
    });
  });

});
