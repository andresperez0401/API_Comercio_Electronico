import { IAplicationService } from "../../Utils/IAplicationService";
import { CrearUsuarioDTO } from "../Dominio/dto/CrearUsuarioDTO";
import { Usuario } from "../Dominio/Usuario";
import { RepositorioUsuario } from "../Dominio/RepositorioUsuario";
import { Either } from "../../Utils/Either";


export class CrearUsuarioService implements IAplicationService<CrearUsuarioDTO, Usuario>{

    private repositorioUsuario: RepositorioUsuario;

    //Para poder realizar la inyeccion de dependencias por constructor
    constructor(repositorioUsuario: RepositorioUsuario){
        this.repositorioUsuario = repositorioUsuario;
    }


    async execute(s: CrearUsuarioDTO): Promise<Either<Usuario, Error>> {
        
        const usuario = Usuario.crearUsuario(s.nombre, s.apellido, s.correo, s.clave);
        const resultado =  this.repositorioUsuario.crearUsuario(usuario);
        
        return resultado;
    }
}