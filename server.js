// Carga variables de entorno
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const path = require('path');


app.use(express.static(path.join(__dirname, 'client')));

const app = express();
const port = process.env.PORT || 8080;

// Variables de entorno para la base de datos
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD || '1234';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'teztz';

// Conexión a MongoDB usando credenciales de dotenv
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}`
)
  .then(() => {
    console.log('Conexión a la base de datos establecida');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  });

// Middleware para parsear JSON
app.use(express.json());

// Schema y modelo de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  password: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rutas de la API
app.get("/", (req, res) => {
  res.status(200).send("Hola mundo");
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

app.get("/usuarios/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nombre, password } = req.body;
  try {
    const usuario = new Usuario({ nombre, password });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/usuarios/:nombre", async (req, res) => {
  const { nombre } = req.params;
  const { password } = req.body;
  try {
    const usuario = await Usuario.findOneAndUpdate(
      { nombre },
      { password },
      { new: true }
    );
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/usuarios/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const usuario = await Usuario.findOneAndDelete({ nombre });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(204).send(); // No hay contenido
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
