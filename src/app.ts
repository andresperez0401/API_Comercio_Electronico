import express from 'express';
import { PrismaClient } from '@prisma/client';

//Imports de productos
import { RepositorioUsuarioImp } from './Usuario/Infraestructura/Repository/RepositorioUsuarioImpl';
import { CrearUsuarioService } from './Usuario/Aplicacion/CrearUsuarioService';
import { LoguearUsuarioService } from './Usuario/Aplicacion/LoguearUsuarioService';
import { EliminarUsuarioService } from './Usuario/Aplicacion/EliminarUsuarioService';
import { UsuarioController } from './Usuario/Infraestructura/Controller/UsuarioController';
import { BuscarUsuariosService } from './Usuario/Aplicacion/BuscarUsuariosService';

//Imports de productos
import { RepositorioProductoImp } from './Producto/Infraestructura/Repository/RepositorioProductoImpl';
import { CrearProductoService } from './Producto/Aplicacion/CrearProductoService';
import { EditarProductoService } from './Producto/Aplicacion/EditarProductoService';
import { EliminarProductoService } from './Producto/Aplicacion/EliminarProductoService';
import { BuscarProductosService } from './Producto/Aplicacion/BuscarProductosService';
import { BuscarProductoPorIdService } from './Producto/Aplicacion/BuscarProductoPorIdService';
import { ProductoController } from './Producto/Infraestructura/Controller/ProductoController';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// Dependencias de Usuario
const repoUsuario = new RepositorioUsuarioImp(prisma);
const usuarioController = new UsuarioController(
    new CrearUsuarioService(repoUsuario),
    new LoguearUsuarioService(repoUsuario),
    new EliminarUsuarioService(repoUsuario),
    new BuscarUsuariosService(repoUsuario)
);

//Dependencias de Producto
const repoProducto = new RepositorioProductoImp(prisma);
const productoController = new ProductoController(
    new CrearProductoService(repoProducto),
    new EditarProductoService(repoProducto),
    new EliminarProductoService(repoProducto),
    new BuscarProductosService(repoProducto),
    new BuscarProductoPorIdService(repoProducto)
);

// Rutas de los endpoints
app.use('/api/usuarios', usuarioController.obtenerRouter());
app.use('/api/productos', productoController.obtenerRouter());

// 4. Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});