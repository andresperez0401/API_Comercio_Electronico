import { Optional } from '../../Utils/Optional';
import {v4 as uuidv4} from 'uuid';

export class IdUsuario{

    private id: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.id = id.getValue();
        } else {
            this.id = uuidv4();
        }
    }

    static crearIdUsuario(id?: string): IdUsuario{
        return new IdUsuario(new Optional<string>(id));
    }

    getValue(): string{
        return this.id;
    }

    equals(id: IdUsuario): boolean{
        return this.id === id.getValue();
    }

    isValid(): boolean{
        return this.id.length > 0;
    }
}