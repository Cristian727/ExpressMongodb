const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000

mongoose.connect("mongodb://localhost:27017/videojuegos", {useNewUrlParser: true, useUnifiedTopology: true})

const juegoSchema = new mongoose.Schema({
    titulo: String,
    desarrolladora: String,
    "fecha-lanzamiento": String,
    plataformas: Array
})

const Juego = mongoose.model('Juego', juegoSchema)

app.get("/", async (req,res) => {
    const juegos = await Juego.find()
    res.send(juegos)
})

app.listen(port, () => {
    console.log(`Servidor lanzado en ${port}`)
})