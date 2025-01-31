export class CorreoUsuario{

    private correo: string;

    private constructor(correo: string){
        this.correo = correo;
    }

    static crearCorreoUsuario(correo: string){
        return new CorreoUsuario(correo);
    }

    getValue(): string{
        return this.correo;
    }

    equals(correo: CorreoUsuario): boolean{
        return this.correo === correo.getValue();
    }

    isValid(): boolean {
        if (
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo) &&
          this.correo.length > 0
        ) {
          return true;
        }
        return false;
      }
}