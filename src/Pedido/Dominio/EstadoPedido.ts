import { Either } from "../../Utils/Either";

export enum EstadoPedido {
    PAGADO = 'PAGADO',
    ENVIADO = 'ENVIADO',
    ENTREGADO = 'ENTREGADO',
    CANCELADO = 'CANCELADO',
    PROCESADO = 'PROCESADO'
}

//Esta funcion nos ayuda a validar cuando un estado de pedido es válido dentro de los estados disponibes
export function convertirEstadoPedido(estado: string): Either<EstadoPedido, Error> {
    const estadosValidos = Object.values(EstadoPedido) as string[];
    
    if (estadosValidos.includes(estado)) {
        return Either.makeLeft(estado as EstadoPedido);
    } else {
        return Either.makeRight(
            new Error(`Estado inválido: ${estado}. Estados válidos: ${estadosValidos.join(", ")}`)
        );
    }
}