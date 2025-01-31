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

    private configurarRutas(): void {
        this.router.post("/crear", this.crearProducto);
        this.router.put("/editar/:id", this.editarProducto);
        this.router.delete("/eliminar/:id", this.eliminarProducto);
        this.router.get("", this.buscarProductos);
        this.router.get("/:id", this.buscarProductoPorId);
    }

    // Función que llama al CrearProductoService
    private crearProducto = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nombre, descripcion, precio, disponibilidad } = req.body;
            
            if (!nombre || !descripcion || !precio || !disponibilidad) {
                res.status(400).json({ error: "Todos los campos son requeridos" });
                return;
            }

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

    // Función que llama al EditarProductoService
    private editarProducto = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, precio, disponibilidad } = req.body;
            
            if (!id || !nombre || !descripcion || !precio || !disponibilidad) {
                res.status(400).json({ error: "Todos los campos son requeridos" });
                return;
            }

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

    // Función que llama al EliminarProductoService
    private eliminarProducto = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({ error: "ID requerido" });
                return;
            }

            const resultado = await this.eliminarService.execute(id);

            resultado.isLeft()
                ? res.status(200).json({ mensaje: "Producto eliminado" })
                : res.status(404).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Función que llama al BuscarProductosService
    private buscarProductos = async (req: Request, res: Response): Promise<void> => {
        try {
            const resultado = await this.buscarProductosService.execute();

            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }    
    }

    // Función que llama al BuscarProductoPorIdService
    private buscarProductoPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            
            if (!id) {
                res.status(400).json({ error: "ID requerido" });
                return;
            }

            const resultado = await this.buscarProductoPorIdService.execute(id);

            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    public obtenerRouter(): Router {
        return this.router;
    }
}