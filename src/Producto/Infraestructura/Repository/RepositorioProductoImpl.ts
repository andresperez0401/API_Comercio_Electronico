// RepositorioUsuarioImpl.ts
import { PrismaClient } from "@prisma/client";;
import { Producto } from "../../Dominio/Producto";
import { RepositorioProducto } from "../../Dominio/RepositorioProducto";
import { Either } from "../../../Utils/Either";
import { EditarProductoDTO } from "../../Dominio/dto/EditarProductoDTO";

export class RepositorioProductoImp implements RepositorioProducto {
 
    constructor(
        private prisma: PrismaClient
    ) {
        this.prisma = new PrismaClient();
    }


//Función que se encarga de crear un producto en la base de datos
//------------------------------------------------------------------------------------------------------------------------------

    async crearProducto(producto: Producto): Promise<Either<Producto, Error>> {
        try {

            //Crea el producto en la base de datos
            const productoDB = await this.prisma.producto.create({
                data: {
                    nombre: producto.getNombre(),
                    descripcion: producto.getDescripcion(),
                    precio: producto.getPrecio(),
                    disponibilidad: producto.getDisponibilidad(),
                    idProducto: producto.getIdProducto(),
                }
            });

            //Retorna el producto creado si fue exitoso
            return Either.makeLeft(
                Producto.crearProducto(
                    productoDB.nombre,
                    productoDB.descripcion,
                    productoDB.precio,
                    productoDB.disponibilidad,
                    productoDB.idProducto                    
                )
            ); 
        } catch (error) {
            return Either.makeRight(new Error("Error al crear el producto: " + (error as Error).message));
        }
    }

//Finaliza la función de crear producto
//------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de eliminar un producto de la base de datos
//------------------------------------------------------------------------------------------------------------------------------

    async eliminarProducto(id: string): Promise<Either<string, Error>> {
        try {
            await this.prisma.producto.delete({
                where: { idProducto: id }
            });
            return Either.makeLeft("Producto eliminado correctamente");
        } catch (error) {
            return Either.makeRight(new Error("Error al eliminar el producto de id: " + id + " " + (error as Error).message));
        }
    }

//Finaliza la función de eliminar producto
//------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de buscar todos los productos existentes en la base de datos
//------------------------------------------------------------------------------------------------------------------------------

    async buscarProductos(): Promise<Either<Iterable<Producto>, Error>> {
        
        try {
            const productosDb = await this.prisma.producto.findMany();
            
            return Either.makeLeft(productosDb.map((productoDB: { nombre: string; descripcion: string; precio: number; disponibilidad: number; idProducto: string; }) => 
                Producto.crearProducto(
                    productoDB.nombre,
                    productoDB.descripcion,
                    productoDB.precio,
                    productoDB.disponibilidad,
                    productoDB.idProducto
                )
            ));
        } catch (error) {
            return Either.makeRight(new Error("Error al obtener los productos: " + + (error as Error).message));
        }
    }

//Finaliza la función de buscar productos
//------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de buscar un producto por ID
//------------------------------------------------------------------------------------------------------------------------------

    async buscarProductoPorId(idProducto: string): Promise<Either<Producto, Error>> {
        try {
            const productoDb = await this.prisma.producto.findUnique({
                where: { idProducto: idProducto }
            });
    
            if (!productoDb) {
                return Either.makeRight(new Error("Producto no encontrado"));
            }
    
            return Either.makeLeft(Producto.crearProducto(
                productoDb.nombre,
                productoDb.descripcion,
                productoDb.precio,
                productoDb.disponibilidad,
                productoDb.idProducto
            ));
        } catch (error) {
            return Either.makeRight(new Error("Error al obtener el producto: " + (error as Error).message));
        }
    }

//Finaliza la función de buscar producto por ID
//------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de actualizar un producto en la base de datos
//------------------------------------------------------------------------------------------------------------------------------

    async actualizarProducto(producto: Producto): Promise<Either<string, Error>> {
        try {
            const productoExistente = await this.prisma.producto.findUnique({
                where: { idProducto: producto.getIdProducto() }
            });

            if (!productoExistente) {
                return Either.makeRight(new Error("Producto no encontrado"));
            }

            await this.prisma.producto.update({
                where: { idProducto: producto.getIdProducto() },
                data: {
                    nombre: producto.getNombre(),
                    descripcion: producto.getDescripcion(),
                    precio: producto.getPrecio(),
                    disponibilidad: producto.getDisponibilidad()
                }
            });

            return Either.makeLeft("Producto actualizado correctamente");
            
        } catch (error) {
            return Either.makeRight(new Error("Error al actualizar el producto: " + (error as Error).message));
        }
    }

//Finaliza la función de actualizar producto
//------------------------------------------------------------------------------------------------------------------------------

}
