import { Router, Request, Response, NextFunction } from "express";
import { RepositorioPedidoImpl } from "../Repository/RepositorioPedidoImpl";
import { Pedido } from "../../Dominio/Pedido";
import { verificarToken } from "../../../Security/Autentication";
import { CrearPedidoDto } from "../../Dominio/dto/CrearPedidoDTO";
import { CrearPedidoService } from "../../Aplicacion/CrearPedidoService";
import { buscarPedidosPorIdUsuarioService } from "../../Aplicacion/BuscarPedidosPorIdUsuarioService";
import { BuscarPedidosService } from "../../Aplicacion/BuscarPedidosService";

export class PedidoController {
    private router: Router;

    constructor(
        private crearPedidoService: CrearPedidoService,
        private buscarPedidosPorIdUsuarioService: buscarPedidosPorIdUsuarioService,
        private buscarPedidosService: BuscarPedidosService,
    ) {
        this.router = Router();
        this.configurarRutas();
    }
    

    //Rutas de la api para Pedidos
    private configurarRutas(): void {
        this.router.post("/", verificarToken, this.crearPedido);
        this.router.get("/usuario/:idUsuario", verificarToken, this.buscarPedidosPorIdUsuario);
        this.router.get("/", verificarToken, this.buscarPedidos);
    }


//Funcion que se encarga de crear un pedido a través del endpoint.
//------------------------------------------------------------------------------------------------------------------------------------------------

    private crearPedido = async (req: Request, res: Response): Promise<void> => {
        try {

            //Obtener el id Usuario del token
            const usuario = (req as any).usuario;

            //Valida que el Token contenga el id del usuario
            if (!usuario?.idUsuario) {
                res.status(401).json({ error: "Token inválido: falta información de usuario" });
                return;
            }

            // Desestructurar los datos del cuerpo de la solicitud
            const { fecha, estado, detalleProductos } = req.body;
    
            // Validación de los campos requeridos
            if (!fecha || !estado ) {
                res.status(400).json({ error: "Todos los campos son requeridos" });
                return;
            }
    
            // Validar que detallePedido sea un arreglo
            if (!Array.isArray(detalleProductos)) {
                res.status(400).json({ error: "El campo detallePedido debe ser un arreglo con idProducto, cantidad y precio" });
                return;
            }

            // Validar que detallePedido no venga vacío
            if (detalleProductos.length === 0) {
                res.status(400).json({ error: "El pedido debe contener al menos un producto" });
                return;
            }

            // Validar que cada elemento de detallePedido tenga idProducto, cantidad y precio
            const elementosInvalidos = detalleProductos.some(item => 
                !item.idProducto || 
                !item.cantidad || 
                item.precio === undefined
            );
    
            if (elementosInvalidos) {
                res.status(400).json({ 
                    error: "Cada producto debe tener idProducto, cantidad y precio" 
                });
                return;
            }
    
            // Crear DTO con los datos recibidos
            const pedidoDto = new CrearPedidoDto(usuario.idUsuario, estado, fecha, detalleProductos);
    
            // Llamar al servicio para crear el pedido
            const resultado = await this.crearPedidoService.execute(pedidoDto);
    
            // Manejar respuesta del servicio
            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(400).json({ error: resultado.getRight().message });
    
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };

//Finaliza la función de crear pedido
//------------------------------------------------------------------------------------------------------------------------------------------------


//Funcion que se encarga de buscar los pedidos de un usuario a través del endpoint.
//------------------------------------------------------------------------------------------------------------------------------------------------
    
    private buscarPedidosPorIdUsuario = async (req: Request, res: Response): Promise<void> => {
        try {

            // Obtener el idUsuario de los parámetros de la solicitud
            const { idUsuario } = req.params;
            
            // Usar el servicio para buscar los pedidos por idUsuario
            const resultado = await this.buscarPedidosPorIdUsuarioService.execute(idUsuario);
            
            // Manejar respuesta obtenida por el servicio
            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };

//Finaliza la función de buscar pedidos por idUsuario
//------------------------------------------------------------------------------------------------------------------------------------------------


//Funcion que se encarga de buscar todos los pedidos a través del endpoint.
//------------------------------------------------------------------------------------------------------------------------------------------------

    private buscarPedidos = async (req: Request, res: Response): Promise<void> => {
        try {
            // Usar el servicio para buscar todos los pedidos
            const resultado = await this.buscarPedidosService.execute();
           
            // Manejar respuesta del Servicio
            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };

//Finaliza la función de buscar pedidos
//------------------------------------------------------------------------------------------------------------------------------------------------

    public obtenerRouter(): Router {
        return this.router;
    }
}
