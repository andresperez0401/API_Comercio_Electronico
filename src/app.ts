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


//Imports de pedidos
import { RepositorioPedidoImpl } from './Pedido/Infraestructura/Repository/RepositorioPedidoImpl';
import { CrearPedidoService } from './Pedido/Aplicacion/CrearPedidoService';
import { buscarPedidosPorIdUsuarioService } from './Pedido/Aplicacion/BuscarPedidosPorIdUsuarioService';
import { BuscarPedidosService } from './Pedido/Aplicacion/BuscarPedidosService';
import { PedidoController } from './Pedido/Infraestructura/Controller/PedidoController';

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


//Dependencias de Pedido
const repoPedido = new RepositorioPedidoImpl(prisma);
const pedidoController = new PedidoController(
    new CrearPedidoService(repoPedido),
    new buscarPedidosPorIdUsuarioService(repoPedido),
    new BuscarPedidosService(repoPedido)
);

// Rutas de los endpoints
app.use('/usuarios', usuarioController.obtenerRouter());
app.use('/productos', productoController.obtenerRouter());
app.use('/pedidos', pedidoController.obtenerRouter());

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});