export class ClaveUsuario {
    private clave: string;
  
    private constructor(clave: string) {
      this.clave = clave;
    }
    
    static crearClaveUsuario(clave: string){
      return new ClaveUsuario(clave);
    }
  
    isValid(): boolean {
      if (!/[^a-zA-Z]/.test(this.clave) && this.clave.length > 0) {
        return true;
      }
      return false;
    }
  
    equals(claveUsuario: ClaveUsuario): boolean {
      return this.clave === claveUsuario.getValue();
    }
  
    getValue(): string {
      return this.clave;
    }
  }