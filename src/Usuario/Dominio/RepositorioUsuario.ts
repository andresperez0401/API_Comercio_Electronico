import { Usuario } from "./Usuario";
import { Either } from "../../Utils/Either";
import { LoguearUsuarioDTO } from "./dto/LoguearUsuarioDTO";


export interface RepositorioUsuario {

    crearUsuario(usuario: Usuario): Promise<Either<Usuario, Error>>;
    loguearUsuario(s: LoguearUsuarioDTO): Promise<Either<Usuario, Error>>;
    eliminarUsuario(id: string): Promise<Either<string, Error>>;
    buscarUsuarios(): Promise<Either<Iterable<Usuario>, Error>>;
}

