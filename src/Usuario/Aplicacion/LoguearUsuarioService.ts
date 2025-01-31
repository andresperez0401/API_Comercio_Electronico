import { IAplicationService } from "../../Utils/IAplicationService";
import { LoguearUsuarioDTO } from "../Dominio/dto/LoguearUsuarioDTO";
import { Usuario } from "../Dominio/Usuario";
import { RepositorioUsuario } from "../Dominio/RepositorioUsuario";
import { Either } from "../../Utils/Either";


export class LoguearUsuarioService implements IAplicationService<LoguearUsuarioDTO, Usuario>
{

  private readonly repositorioUsuario: RepositorioUsuario;

  constructor(repositorioUsuario: RepositorioUsuario) {
    this.repositorioUsuario = repositorioUsuario;
  }

  async execute(s: LoguearUsuarioDTO): Promise<Either<Usuario, Error>> {
    return await this.repositorioUsuario.loguearUsuario(s);
  }
}