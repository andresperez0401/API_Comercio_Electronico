import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


//Funcion que se le agrega a las rutas para validar el token de autenticacion
//----------------------------------------------------------------------------------------------------------------------------

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        res.status(401).json({ error: "Token de autenticación requerido" });
        return;
    }
    
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ error: "JWT_SECRET no está definido en las variables de entorno" });
        return;
    }
    
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
            
            //Este campo debe contener el ID del usuario para que despues pueda ser capturado al crear el pedido
            idUsuario: string;  
            correo: string 
        };

        (req as any).usuario = decoded;
        next();

    } catch (error) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }

//Fin de la funcion verificarToken
//----------------------------------------------------------------------------------------------------------------------------
};
