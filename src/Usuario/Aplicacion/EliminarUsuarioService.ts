import { IAplicationService } from "../../Utils/IAplicationService";
import { RepositorioUsuario } from "../Dominio/RepositorioUsuario";
import { Either } from "../../Utils/Either";


export class EliminarUsuarioService implements IAplicationService<string, string>{

    private repositorioUsuario: RepositorioUsuario;

    //Para poder realizar la inyeccion de dependencias por constructor
    constructor(repositorioUsuario: RepositorioUsuario){
        this.repositorioUsuario = repositorioUsuario;
    }


    async execute(id: string): Promise<Either<string, Error>> {
        
        const resultado = await this.repositorioUsuario.eliminarUsuario(id);

        return resultado;
    }
}