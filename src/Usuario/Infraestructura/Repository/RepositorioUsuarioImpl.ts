// RepositorioUsuarioImpl.ts
import { PrismaClient } from "@prisma/client";
import { LoguearUsuarioDTO } from "../../Dominio/dto/LoguearUsuarioDTO";
import { CrearUsuarioDTO } from "../../Dominio/dto/CrearUsuarioDTO";
import { Usuario } from "../../Dominio/Usuario";
import { RepositorioUsuario } from "../../Dominio/RepositorioUsuario";
import { Either } from "../../../Utils/Either";
import { IdUsuario } from "../../Dominio/IdUsuario";

export class RepositorioUsuarioImp implements RepositorioUsuario {
 
    constructor(
        private prisma: PrismaClient
    ) {
        this.prisma = new PrismaClient();
    }

    // Crear Usuario
    async crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>> {
        try {
            const usuarioDB = await this.prisma.usuario.create({
                data: {
                    correo: usuario.getCorreo(),
                    clave: usuario.getClave(),
                    nombre: usuario.getNombre(),
                    apellido: usuario.getApellido(),
                    idUsuario: usuario.getId(),
                }
            });


            return Either.makeLeft(
                Usuario.crearUsuario(
                    usuarioDB.nombre,
                    usuarioDB.apellido,
                    usuarioDB.correo,
                    usuarioDB.clave,
                    usuarioDB.idUsuario                    
                )
            ); 
        } catch (error) {
            return Either.makeRight(new Error("Error al crear usuario: " + + (error as Error).message));
        }
    }

    // Implementación del método para loguear un usuario
    async loguearUsuario(dto: LoguearUsuarioDTO): Promise<Either<Usuario, Error>> {
        try {
            // Buscar usuario en la base de datos por email
            const usuario = await this.prisma.usuario.findUnique({
                where: {
                    correo: dto.correo,
                },
            });

            if (!usuario) {
                 return Either.makeRight(new Error("Usuario no encontrado"));
            }

            // Validar la contraseña
            if (usuario.clave !== dto.clave) {
                return Either.makeRight(new Error("Contraseña incorrecta"));
            }

            return Either.makeLeft(
                Usuario.crearUsuario(
                    usuario.nombre,
                    usuario.apellido,
                    usuario.correo,
                    usuario.clave,
                    usuario.idUsuario
                )
            );
                        
        } catch (error) {
            return Either.makeRight(new Error("Error al intentar loguear al usuario: " + (error as Error).message));
        }
    }

    // Eliminar Usuario
    async eliminarUsuario(id: string): Promise<Either<string, Error>> {
        try {
            await this.prisma.usuario.delete({
                where: { idUsuario: id }
            });
            return Either.makeLeft("Usuario eliminado correctamente");
        } catch (error) {
            return Either.makeRight(new Error("Error al eliminar usuario de id: " + id + " " + (error as Error).message));
        }
    }

    //Obtener todos los usuarios
    async buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>> {
        
        try {
            const usuariosDb = await this.prisma.usuario.findMany();
            
            return Either.makeLeft(usuariosDb.map((usuarioDB: { nombre: string; apellido: string; correo: string; clave: string; idUsuario: string; }) => 
                Usuario.crearUsuario(
                    usuarioDB.nombre,
                    usuarioDB.apellido,
                    usuarioDB.correo,
                    usuarioDB.clave,
                    usuarioDB.idUsuario
                )
            ));
        } catch (error) {
            return Either.makeRight(new Error("Error al buscar usuarios: " + + (error as Error).message));
        }
    
    }
}
