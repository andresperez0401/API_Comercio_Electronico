import { Either } from "../../Utils/Either";

export class FechaPedido {
    private fecha: string;

    private constructor(fecha: string) {
        this.fecha = fecha;
    }

    static crearFechaPedido(fecha: string): FechaPedido {
        return new FechaPedido(fecha);
    }

    getValue(): string {
        return this.fecha;
    }

    getFechaDate(): Date {
        const [fechaPart, horaPart] = this.fecha.split(' ');
        const [year, month, day] = fechaPart.split('-');
        const [hours, minutes, seconds] = horaPart.split(':');
        
        return new Date(
            parseInt(year),
            parseInt(month) - 1, // Meses en Date son 0-based
            parseInt(day),
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds)
        );
    }
}

    export function validarFecha(fecha: string): Either<string, Error> {
        // Expresión regular para validar el formato AAAA-mm-DD HH:mm:ss
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        
        // Verificar si el formato de la fecha coincide con la expresión regular
        if (!regex.test(fecha)) {
            return Either.makeRight(new Error('El formato de la fecha debe ser con formato: AAAA-mm-DD HH:mm:ss'));
        }
    
        // Verificar si la fecha es válida
        const [fechaParte, horaParte] = fecha.split(' ');
        const [anio, mes, dia] = fechaParte.split('-').map(Number);
        const [hora, minuto, segundo] = horaParte.split(':').map(Number);
    
        // Verificar si la fecha es válida usando Date
        const fechaValida = new Date(anio, mes - 1, dia, hora, minuto, segundo);
        if (
            fechaValida.getFullYear() !== anio || 
            fechaValida.getMonth() !== mes - 1 || 
            fechaValida.getDate() !== dia || 
            fechaValida.getHours() !== hora || 
            fechaValida.getMinutes() !== minuto || 
            fechaValida.getSeconds() !== segundo
        ) {
            Either.makeRight(new Error('La fecha colocada es inválida'));
        }
    
        return Either.makeLeft(fecha);
    }


   
