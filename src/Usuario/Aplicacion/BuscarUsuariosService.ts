import { IAplicationService } from "../../Utils/IAplicationService";
import { Usuario } from "../Dominio/Usuario";
import { RepositorioUsuario } from "../Dominio/RepositorioUsuario";
import { Either } from "../../Utils/Either";

export class BuscarUsuariosService implements IAplicationService<string, Iterable<Usuario>>{

    private repositorioUsuario: RepositorioUsuario;

    constructor (repositorioUsuario: RepositorioUsuario){
        this.repositorioUsuario = repositorioUsuario;
    }

    async execute(): Promise<Either<Iterable<Usuario>, Error>> {
        return await this.repositorioUsuario.buscarUsuarios();
    }
}