import { Router, Request, Response } from "express";
import { LoguearUsuarioService } from "../../Aplicacion/LoguearUsuarioService";
import { CrearUsuarioService } from "../../Aplicacion/CrearUsuarioService";
import { EliminarUsuarioService } from "../../Aplicacion/EliminarUsuarioService";
import { LoguearUsuarioDTO } from "../../Dominio/dto/LoguearUsuarioDTO";
import { CrearUsuarioDTO } from "../../Dominio/dto/CrearUsuarioDTO";
import { BuscarUsuariosService } from "../../Aplicacion/BuscarUsuariosService";
import jwt  from "jsonwebtoken";
import { verificarToken } from "../../../Security/Autentication";


export class UsuarioController {
    private router: Router;

    constructor(
        private crearService: CrearUsuarioService,
        private loguearService: LoguearUsuarioService,
        private eliminarService: EliminarUsuarioService,
        private buscarUsuariosService: BuscarUsuariosService
    ) {
        this.router = Router();
        this.configurarRutas();
    }

    //Rutas de la api para Usuarios
    private configurarRutas(): void {
        this.router.post("/registro", this.crearUsuario);
        this.router.post("/login", this.loguearUsuario);
        this.router.delete("/:id", verificarToken, this.eliminarUsuario);
        this.router.get("", this.buscarUsuarios);
    }

// Función encargada de crear el usuario a traves del endpoint
//--------------------------------------------------------------------------------------------------------------------------------

    private crearUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nombre, correo, clave, apellido } = req.body;
            
            // Validación de los campos requeridos
            if (!nombre || !correo || !clave || !apellido) {
                res.status(400).json({ error: "Todos los campos son requeridos" });
                return;
            }

            // Crear DTO y llamar al servicio crear usuario
            const resultado = await this.crearService.execute(
                new CrearUsuarioDTO(nombre, apellido, correo, clave)
            );

            // Manejar respuesta del servicio
            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(400).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de crear usuario
//--------------------------------------------------------------------------------------------------------------------------------


// Función encargada de loguear el usuario a traves del endpoint
//--------------------------------------------------------------------------------------------------------------------------------

    private loguearUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { correo, clave } = req.body;
            
            if (!correo || !clave) {
                res.status(400).json({ error: "Credenciales requeridas" });
                return;
            }

            const resultado = await this.loguearService.execute(
                new LoguearUsuarioDTO(correo, clave)
            );

            if (resultado.isLeft()) {
                
                const usuarioAutenticado = resultado.getLeft();

                const datosUsuario = {
                    idUsuario: usuarioAutenticado.getId(),
                    correo: usuarioAutenticado.getCorreo()
                };

                // Firmar el JWT usando la clave secreta y establecer la expiración (opcional)
                if (!process.env.JWT_SECRET) {
                   res.status(401).json({error : "JWT_SECRET is not defined"});
                }
                else{
                    const token = jwt.sign(datosUsuario, process.env.JWT_SECRET, { expiresIn: '1h' });

                    // res.cookie("", token, { 
                    //     httpOnly: true,
                    //     sameSite: "strict",
                    //     maxAge: 3600000
                    // });

                    // Enviar el JWT como respuesta
                    res.status(200).json({ token });
                }
                
            }
            else{
                res.status(401).json({ error: resultado.getRight().message });
            }

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de loguear usuario
//--------------------------------------------------------------------------------------------------------------------------------

//Función encargada de eliminar el usuario a traves del endpoint
//--------------------------------------------------------------------------------------------------------------------------------

    private eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

                if (!id) {
                    res.status(400).json({ error: "ID requerido" });
                    return;
                }

                const resultado = await this.eliminarService.execute(id);

                resultado.isLeft()
                    ? res.status(200).json({ mensaje: "Usuario eliminado" })
                    : res.status(404).json({ error: resultado.getRight().message });

        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

//Finaliza la función de eliminar usuario
//--------------------------------------------------------------------------------------------------------------------------------

//Función encargada de buscar todos los usuarios a traves del endpoint
//--------------------------------------------------------------------------------------------------------------------------------
   
    private buscarUsuarios = async (req: Request, res: Response): Promise<void> => {
    
        try {
            const resultado = await this.buscarUsuariosService.execute();

            resultado.isLeft()
                ? res.status(200).json(resultado.getLeft())
                : res.status(404).json({ error: resultado.getRight().message });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor" });
        }    
    }

//Finaliza la función de buscar usuarios
//--------------------------------------------------------------------------------------------------------------------------------

    public obtenerRouter(): Router {
        return this.router;
    }
}