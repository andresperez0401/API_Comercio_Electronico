import { Optional } from "../../Utils/Optional";
import { ApellidoUsuario } from "./ApellidoUsuario";
import { ClaveUsuario } from "./ClaveUsuario";
import { CorreoUsuario } from "./CorreoUsuario";
import { IdUsuario } from "./IdUsuario";
import { NombreUsuario } from "./NombreUsuario";

export class Usuario {

    private id: Optional<IdUsuario>;
    private nombre: NombreUsuario;
    private apellido: ApellidoUsuario;
    private correo: CorreoUsuario;
    private clave: ClaveUsuario;


    private constructor(
        nombre: NombreUsuario,
        apellido: ApellidoUsuario,
        correo: CorreoUsuario,
        clave: ClaveUsuario,
        id: IdUsuario,
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.clave = clave;
        this.id = new Optional<IdUsuario>(id);
        
    }

    static crearUsuario(
        nombre: string,
        apellido: string,
        correo: string,
        clave: string,
        id?: string,
    ): Usuario{
        return new Usuario(
        NombreUsuario.crearNombreUsuario(nombre),
        ApellidoUsuario.crearApellidoUsuario(apellido),
        CorreoUsuario.crearCorreoUsuario(correo),
        ClaveUsuario.crearClaveUsuario(clave),
        IdUsuario.crearIdUsuario(id)
        );

    }

    getNombre(): string{
        return this.nombre.getValue();
    }

    getApellido(): string{
        return this.apellido.getValue();
    }

    getCorreo(): string{
        return this.correo.getValue();
    }

    hasId(): boolean{
        return this.id !== undefined;
    }

    getClave(): string{
        return this.clave.getValue();
    }

    getId(): string{
        return this.id.getValue().getValue();
    }

}