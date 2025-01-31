import { Optional } from '../../Utils/Optional';
import {v4 as uuidv4} from 'uuid';

export class IdProducto{

    private id: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.id = id.getValue();
        } else {
            this.id = uuidv4();
        }
    }

    static crearIdProducto(id?: string): IdProducto{
        return new IdProducto(new Optional<string>(id));
    }

    getValue(): string{
        return this.id;
    }

    equals(id: IdProducto): boolean{
        return this.id === id.getValue();
    }

    isValid(): boolean{
        return this.id.length > 0;
    }
}