export class NombreProducto{

    private nombre: string;

    private constructor(nombre: string){
        this.nombre = nombre;
    }

    static crearNombreProducto(nombre: string){
        return new NombreProducto(nombre);
    }

    getValue(): string{
        return this.nombre;
    }

    equals(nombre: NombreProducto): boolean{
        return this.nombre === nombre.getValue();
    }

    isValid(): boolean {
        if (this.nombre.length > 0) {
          return true;
        }
        return false;
    }
}