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


    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}