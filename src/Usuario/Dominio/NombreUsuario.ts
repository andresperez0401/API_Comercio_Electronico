export class NombreUsuario{

    private nombre: string;

    private constructor(nombre: string){
        this.nombre = nombre;
    }

    static crearNombreUsuario(nombre: string){
        return new NombreUsuario(nombre);
    }

    getValue(): string{
        return this.nombre;
    }

    equals(nombre: NombreUsuario): boolean{
        return this.nombre === nombre.getValue();
    }

    isValid(): boolean {
        if (!/[^a-zA-Z]/.test(this.nombre) && this.nombre.length > 0) {
          return true;
        }
        return false;
    }
    
}