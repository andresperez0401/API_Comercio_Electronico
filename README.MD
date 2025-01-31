# 🚀 API de Comercio Electrónico

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-blue)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-orange)](https://www.prisma.io/)

API REST para gestión de usuarios, productos y pedidos con autenticación JWT y arquitectura limpia.

##  Características Principales
- ✅ Autenticación JWT
- ✅ Endpoints para usuarios, productos y pedidos
- ✅ Arquitectura Hexagonal
- ✅ Integración con PostgreSQL mediante Prisma ORM


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

