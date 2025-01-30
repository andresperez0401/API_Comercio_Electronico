// Importamos la libreria de express
const express = require('express');

// Creamos una instancia de Express
const app = express();

// Definimos una ruta para probar
app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

// Levantamos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
