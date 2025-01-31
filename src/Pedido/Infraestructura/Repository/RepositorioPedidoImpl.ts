import { PrismaClient } from "@prisma/client";
import { Pedido } from "../../Dominio/Pedido";
import { RepositorioPedido } from "../../Dominio/RepositorioPedido";
import { Either } from "../../../Utils/Either";
import { convertirEstadoPedido, EstadoPedido } from "../../Dominio/EstadoPedido";
import { Optional } from "../../../Utils/Optional";
import { DetalleProducto } from "../../Dominio/DetalleProducto";
import { error } from "console";

export class RepositorioPedidoImpl implements RepositorioPedido {
    
    constructor(
        private prisma: PrismaClient
    ) {
        this.prisma = new PrismaClient();
    }

//Funcion encargada de crear un pedido en la base de datos.
// ----------------------------------------------------------------------------------------------------
    
    async crearPedido(pedido: Pedido): Promise<Either<Pedido, Error>> {
        try {
            // Validar existencia del usuario en base de de datos.
            const usuarioExistente = await this.prisma.usuario.findUnique({
                where: { idUsuario: pedido.getIdUsuario() }
            });

            //Si no existe el usuario, retornamos el error: Usuario no encontrado.
            if (!usuarioExistente) {
                return Either.makeRight(new Error("Usuario no encontrado"));
            }

            // Este arreglo contendrá el detalle de los productos del pedido.
            const detallePedido = [];       

            // Se valida la existencia de cada producto colocado en el detalle del pedido.
            for (const detalle of pedido.getDetallePedido().getValue()) {
                const productoExistente = await this.prisma.producto.findUnique({
                    where: { idProducto: detalle.getIdProducto()}
                });

                //Si alguno de los productos del detalle no existen, se retorna un error.
                if (!productoExistente) {
                    return Either.makeRight(new Error(`Producto con ID ${detalle.getIdProducto()} no encontrado`));
                }

               //Se agregan los detalles del pedido al arreglo detallePedido, que cotendrá el detelle de tosos los productos.
                detallePedido.push({
                    idProducto: detalle.getIdProducto(),
                  //idPedido: pedido.getIdPedido(), Prisma se encarga de asignar el id del pedido, automáticamente por la relación, por eso esta comentado.
                    cantidad: detalle.getCantidad(),
                    precio: productoExistente.precio
                });
                
            }

            // Una vez validados tosos los productos, creamos el pedido en la base de datos.
            const pedidoDB = await this.prisma.pedido.create({
                data: {
                    idPedido: pedido.getIdPedido(),
                    idUsuario: pedido.getIdUsuario(),
                    fecha: pedido.getFecha(),
                    estado: pedido.getEstado(),
                    montoTotal: pedido.calcularMontoTotal(),
                    detalleProductos:  {
                        
                        //Mapea el arreglo de detallePedido para crear los detalles del pedido en la base de datos.
                        //El connect Conecta este DetallePedido al Producto que ya existe en la base de datos, cuyo idProducto es igual a detalle.idProducto".
                        create: detallePedido.map(detalle => ({
                            producto: { connect: { idProducto: detalle.idProducto } },
                            cantidad: detalle.cantidad,
                            precio: detalle.precio
                        }))
                    }
                },
                //Le indica a prisma que incluya la relación entre Pedido y DetallePedido (DetalleProducto).
                include: {
                    detalleProductos: true
                }
            });
            return Either.makeLeft(pedido);
        } catch (error) {
            return Either.makeRight(new Error("Error al crear el pedido: " + (error as Error).message));
        }
    }

// Finalizar el crear pedido en base de datos
// ----------------------------------------------------------------------------------------------------------------


// Buscar pedidos por ID de usuario con detalles
//-----------------------------------------------------------------------------------------------------------------
    async buscarPedidosPorIdUsuario(idUsuario: string): Promise<Either<Iterable<Pedido>, Error>> {
        try {

            // Buscar pedidos por ID de usuario en la base de datos
            const pedidosDb = await this.prisma.pedido.findMany({
                where: { idUsuario },
                include: { detalleProductos: true }
            });

            //Si no consigue pedidos asociados al usuario, retorna un error.
            if (!pedidosDb || pedidosDb.length === 0) {
                return Either.makeRight(new Error("El ID de usuario proporcionado, no tiene pedidos asociados."));
            }

            // Mapea los pedidos de la base de datos a objetos de tipo Pedido.
            const pedidos: Pedido[] = pedidosDb.map((pedidoDB: any): Pedido => {

                //Como el estado es Enum, lo trasnsforma al instanciar el Pedido.
                const estadoDelPedido = convertirEstadoPedido(pedidoDB.estado);

                //Si el estado no es valido, retorna un error. Lanza el error pero en el catch se maneja con el Either
                if (estadoDelPedido.isRight()) {
                    throw new Error("No se pudo convertir el estado del pedido, error: " + estadoDelPedido.getRight().message);
                }

                if (!pedidoDB.detalleProductos || pedidoDB.detalleProductos.length === 0) {
                    throw new Error("No se encontraron detalles para el pedido");
                }

                //Instancia el Pedido con los datos de la base de datos.
                return Pedido.crearPedido(
                    pedidoDB.idUsuario,
                    pedidoDB.fecha,
                    estadoDelPedido.getLeft(),
                    new Optional<DetalleProducto[]>(
                        pedidoDB.detalleProductos.map((detalle: { idProducto: string, idPedido: string, cantidad: number, precio: number }) => 
                            DetalleProducto.crearDetalleProducto(
                                detalle.idProducto,
                                detalle.cantidad,
                                detalle.precio,
                                detalle.idPedido
                            )
                        )
                    )
                );
            });

            return Either.makeLeft(pedidos);
        } catch (error) {
            return Either.makeRight(new Error("Error al obtener pedidos del usuario: " + (error as Error).message));
        }
    }

//Finaliza la funcion Buscar Pedidos por IdUsuario
//---------------------------------------------------------------------------------------------------------------------------


// Buscar todos los pedidos con detalles
//--------------------------------------------------------------------------------------------------------------------------
   
     async buscarPedidos(): Promise<Either<Iterable<Pedido>, Error>> {
        try {

            // Buscar todos los pedidos en la base de datos
            const pedidosDb = await this.prisma.pedido.findMany({ include: { detalleProductos: true } });

            //Si no consigue pedidos, retorna un error.
            if (!pedidosDb) {
                return Either.makeRight(new Error("No se encontraron pedidos en la base de datos"));
            }

            // Mapea los pedidos de la base de datos a objetos de tipo Pedido.
            const pedidos: Pedido[] = pedidosDb.map((pedidoDB: any): Pedido => {

                //Como el estado es Enum, lo trasnsforma al instanciar el Pedido.
                const estadoDelPedido = convertirEstadoPedido(pedidoDB.estado);

                //Si el estado no es valido, retorna un error. Lanza el error pero en el catch se maneja con el Either
                if (estadoDelPedido.isRight()) {
                    throw new Error(estadoDelPedido.getRight().message);
                }

                //Instancia el Pedido con los datos de la base de datos.
                return Pedido.crearPedido(
                    pedidoDB.idUsuario,
                    pedidoDB.fecha,
                    estadoDelPedido.getLeft(),
                    new Optional<DetalleProducto[]>(
                        pedidoDB.detalleProductos.map((detalle: { idProducto: string, idPedido: string, cantidad: number, precio: number }) => 
                            DetalleProducto.crearDetalleProducto(
                                detalle.idProducto,
                                detalle.cantidad,
                                detalle.precio,
                                detalle.idPedido
                            )
                        )
                    )
                );
            });

            return Either.makeLeft(pedidos);
        } catch (error) {
            return Either.makeRight(new Error("Error al obtener todos los pedidos: " + (error as Error).message));
        }
    }

//Finaliza la funcion Buscar Pedidos
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

    // // Eliminar pedido
    // async eliminarPedido(idPedido: string): Promise<Either<string, Error>> {
    //     try {
    //         await this.prisma.pedido.delete({
    //             where: { idPedido }
    //         });
    //         return Either.makeLeft("Pedido eliminado correctamente");
    //     } catch (error) {
    //         return Either.makeRight(new Error("Error al eliminar el pedido: " + (error as Error).message));
    //     }
    // }
}
