import { Optional } from '../../Utils/Optional';
import {v4 as uuidv4} from 'uuid';

export class IdPedido{

    private id: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.id = id.getValue();
        } else {
            this.id = uuidv4();
        }
    }

    static crearIdPedido(id?: string): IdPedido{
        return new IdPedido(new Optional<string>(id));
    }

    getValue(): string{
        return this.id;
    }

    equals(id: IdPedido): boolean{
        return this.id === id.getValue();
    }

    isValid(): boolean{
        return this.id.length > 0;
    }
}