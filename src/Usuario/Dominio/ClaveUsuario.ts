export class ClaveUsuario {
    private clave: string;
  
    private constructor(clave: string) {
      this.clave = clave;
    }
    
    static crearClaveUsuario(clave: string){
      return new ClaveUsuario(clave);
    }
  
    isValid(): boolean {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.clave);
  }
  
    equals(claveUsuario: ClaveUsuario): boolean {
      return this.clave === claveUsuario.getValue();
    }
  
    getValue(): string {
      return this.clave;
    }
  }