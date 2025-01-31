export class DescripcionProducto {
    private descripcion: string;

    private constructor(descripcion: string) {
        this.descripcion = descripcion;
    }

    static crearDescripcion(descripcion: string): DescripcionProducto {
        return new DescripcionProducto(descripcion);
    }

    getValue(): string {
        return this.descripcion;
    }

    isValid(): boolean {
        if (this.descripcion.length > 0) {
            return true;
        }
        return false;
    }
}