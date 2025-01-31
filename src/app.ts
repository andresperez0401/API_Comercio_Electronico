// En tu archivo principal (app.ts/server.ts)
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { RepositorioUsuarioImp } from './Usuario/Infraestructura/Repository/RepositorioUsuarioImpl';
import { CrearUsuarioService } from './Usuario/Aplicacion/CrearUsuarioService';
import { LoguearUsuarioService } from './Usuario/Aplicacion/LoguearUsuarioService';
import { EliminarUsuarioService } from './Usuario/Aplicacion/EliminarUsuarioService';
import { UsuarioController } from './Usuario/Infraestructura/Controller/UsuarioController';
import { BuscarUsuariosService } from './Usuario/Aplicacion/BuscarUsuariosService';

const app = express();
app.use(express.json()); // Para parsear JSON

// 1. Configurar dependencias
const prisma = new PrismaClient();
const repositorio = new RepositorioUsuarioImp(prisma);
const crearService = new CrearUsuarioService(repositorio);
const loguearService = new LoguearUsuarioService(repositorio);
const eliminarService = new EliminarUsuarioService(repositorio);
const buscarUsuariosService = new BuscarUsuariosService(repositorio);

// 2. Crear controlador
const usuarioController = new UsuarioController(
    crearService,
    loguearService,
    eliminarService,
    buscarUsuariosService
);

// 3. Registrar rutas
app.use('/api/usuarios', usuarioController.obtenerRouter());

// 4. Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});