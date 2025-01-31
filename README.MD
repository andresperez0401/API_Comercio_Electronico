# 🚀 API de Comercio Electrónico

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-blue)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-orange)](https://www.prisma.io/)

API REST para gestión de usuarios, productos y pedidos con autenticación JWT y arquitectura hexagonal.

##  Características Principales
- ✅ Autenticación JWT
- ✅ Endpoints para usuarios, productos y pedidos
- ✅ Arquitectura Hexagonal
- ✅ Integración con PostgreSQL mediante Prisma ORM

## Desarrollado por

Este proyecto fue desarrollado por [Andrés Pérez](https://github.com/andresperez0401).


## Para ejecutar 
```bash
    npm run start
```

# 🏗️ Estructura del Código
```
src/
├── Usuario
    ├── Dominio
    ├── Aplicacion
    ├── Infraestructura
├── Producto
    ├── Dominio
    ├── Aplicacion
    ├── Infraestructura
├── Pedido
    ├── Dominio
    ├── Aplicacion
    ├── Infraestructura
```

## 📡 Endpoints 

### Usuarios
| Método | Endpoint 	            | Función                |
|--------|--------------------------|------------------------|
| POST   | `/usuarios/registro`     | Registro de usuario    |
| POST   | `/usuarios/login`        | Generación de JWT      |
| DELETE | `/:idUsuario`            | Eliminar usuario       | 
| GET    | `/usuarios`              | Listar todos usuarios  | 

### Productos
| Método | Endpoint 	                    | Función                     |
|--------|----------------------------------|-----------------------------|
| POST   | `/productos/crear`               | Registro de Producto        |
| POST   | `/productos/editar/:idProducto`  | Edición de Producto         |
| DELETE | `/productos/eliminar/:idProducto`| Eliminar Producto           | 
| GET    | `/productos`                     | Listar todos los productos  | 
| GET    | `/productos/:idProducto`         | Listar un producto por id   | 


### Pedidos
| Método | Endpoint 	                | Función                       |
|--------|------------------------------|-------------------------------|
| POST   | `/pedidos/`                  | Registrar un pedido           |
| GET    | `/pedidos/`                  | Listar todos los pedidos      |
| GET    | `/pedidos/usuario/:idUsuario`| Listar pedidos de un usuario  |


## 🛠️ Instalación

1. Clonar repositorio:
```bash
git clone https://github.com/andresperez0401/API_Comercio_Electronico.git
cd API_Comercio_Electronico
```

2. Instalar Dependencias:
```bash
npm install
```

3. Otros comandos que puedsen servir:
```bash

npm install express

npm install dotenv

npm install typescript ts-node

npm install prisma @prisma/client
```