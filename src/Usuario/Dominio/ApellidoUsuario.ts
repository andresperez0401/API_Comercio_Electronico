export class ApellidoUsuario{

    private apellido: string;

    private constructor(apellido: string){
        this.apellido = apellido;
    }

    static crearApellidoUsuario(apellido: string){
        return new ApellidoUsuario(apellido);
    }

    getValue(): string{
        return this.apellido;
    }

    equals(apellido: ApellidoUsuario): boolean{
        return this.apellido === apellido.getValue();
    }

    isValid(): boolean {
        if (!/[^a-zA-Z]/.test(this.apellido) && this.apellido.length > 0) {
          return true;
        }
        return false;
    }
    
}