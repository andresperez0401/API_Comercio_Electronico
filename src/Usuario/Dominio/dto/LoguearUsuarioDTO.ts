export class LoguearUsuarioDTO {
    public correo: string;
    public clave: string;

    constructor(correo: string, clave: string) {
        this.correo = correo;
        this.clave = clave;
    }
}

//Se le asigna la exclamación debido a que TS obliga a inicializar por constructor,
//en este caso al ser un DTO no se inicializa, por lo que se le asigna la exclamación
//para que TS no muestre error de inicialización.