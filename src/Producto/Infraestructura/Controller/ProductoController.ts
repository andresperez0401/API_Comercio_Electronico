import { Router, Request, Response } from "express";
import { CrearProductoService } from "../../Aplicacion/CrearProductoService";
import { EliminarProductoService } from "../../Aplicacion/EliminarProductoService";
import { EditarProductoService } from "../../Aplicacion/EditarProductoService";
import { BuscarProductosService } from "../../Aplicacion/BuscarProductosService";
import { BuscarProductoPorIdService } from "../../Aplicacion/BuscarProductoPorIdService";
import { EditarProductoDTO } from "../../Dominio/dto/EditarProductoDTO";
import { CrearProductoDTO } from "../../Dominio/dto/CrearProductoDTO";

export class ProductoController {
    private router: Router;

    constructor(
        private crearService: CrearProductoService,
        private editarService: EditarProductoService,
        private eliminarService: EliminarProductoService,
        private buscarProductosService: BuscarProductosService,
        private buscarProductoPorIdService: BuscarProductoPorIdService
    ) {
        this.router = Router();
        this.configurarRutas();
    }

    // Configuración de las rutas para producto
    private configurarRutas(): void {
        this.router.post("/crear", this.crearProducto);
        this.router.put("/editar/:id", this.editarProducto);
        this.router.delete("/eliminar/:id", this.eliminarProducto);
        this.router.get("", this.buscarProductos);
        this.router.get("/:id", this.buscarProductoPorId);
    }


//Función que se encarga de crear un producto a través de un endpoint
//----------------------------------------------------------------------------------------------------------------------------------------------

    private crearProducto = async (req: Request, res: Response): Promise<void> => {
        try {

            //Solicita los campos en el body del json
            const { nombre, descripcion, precio, disponibilidad } = req.body;
            
            //valida que esten presente estos campos
            if (!nombre || !descripcion || !precio || !disponibilidad) {
                res.status(400).json({ error: "Todos los campos son requeridos" });
                return;
            }

            //Llama al servicio de CrearProductoService
            const resultado = await this.crearService.execute(
                new CrearProductoDTO(nombre, descripcion, precio, disponibilidad)
            );

            resultado.isLeft()
                ? res.status(201).json(resultado.getLeft())
                : res.status(400).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de crear producto
//--------------------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de editar un producto a través de un endpoint
//--------------------------------------------------------------------------------------------------------------------------------------------

    private editarProducto = async (req: Request, res: Response): Promise<void> => {
        try {

            //Obtiene el id del producto por la ruta
            const { id } = req.params;

            //Obtiene lso campos por el body del request
            const { nombre, descripcion, precio, disponibilidad } = req.body;
            
            //Valida que los campos esten presentes
            if (!id || !nombre || !descripcion || !precio || !disponibilidad) {
                res.status(400).json({ error: "Todos los campos son requeridos" });
                return;
            }

            //Llama al servicio de EditarProductoService
            const resultado = await this.editarService.execute(
                new EditarProductoDTO(id, nombre, descripcion, precio, disponibilidad)
            );

            resultado.isLeft()
                ? res.status(200).json({ mensaje: resultado.getLeft() })
                : res.status(404).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de editar producto
//--------------------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de eliminar un producto a través de un endpoint
//-------------------------------------------------------------------------------------------------------------------------------------------
   
    private eliminarProducto = async (req: Request, res: Response): Promise<void> => {
        try {

            //Obtiene el id del producto por la ruta
            const { id } = req.params;
            
            //Valida que el id este presente
            if (!id) {
                res.status(400).json({ error: "ID requerido" });
                return;
            }

            //Llama al servicio de EliminarProductoService
            const resultado = await this.eliminarService.execute(id);

            resultado.isLeft()
                ? res.status(200).json({ mensaje: "Producto eliminado" })
                : res.status(404).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de eliminar producto
//-------------------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de buscar todos los productos a través de un endpoint
//--------------------------------------------------------------------------------------------------------------------------------

    private buscarProductos = async (req: Request, res: Response): Promise<void> => {
        try {

            //Llama al servicio de BuscarProductosService
            const resultado = await this.buscarProductosService.execute();

            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }    
    }

//Finaliza la función de buscar productos
//--------------------------------------------------------------------------------------------------------------------------------


//Función que se encarga de buscar un producto por id a través de un endpoint
//--------------------------------------------------------------------------------------------------------------------------------

    private buscarProductoPorId = async (req: Request, res: Response): Promise<void> => {
        try {

            //Obtiene el id del producto por la ruta
            const { id } = req.params;
            
            //Valida que el id este presente
            if (!id) {
                res.status(400).json({ error: "ID requerido" });
                return;
            }

            //Llama al servicio de BuscarProductoPorIdService
            const resultado = await this.buscarProductoPorIdService.execute(id);

            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de buscar producto por id
//--------------------------------------------------------------------------------------------------------------------------------

    public obtenerRouter(): Router {
        return this.router;
    }
}