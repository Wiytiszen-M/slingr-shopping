# Shopping List App

Este proyecto es una aplicación full-stack para la gestión de una lista de compras, con funcionalidades para agregar, editar, eliminar y visualizar ítems.

## Tecnologías utilizadas

- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React, Vite, TypeScript, Redux, Material UI
- **Base de datos**: PostgreSQL

## Configuración del Backend

### Prerrequisitos

- **Node.js** (v18.x.x)
- **PostgreSQL** instalado y corriendo localmente

### Variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example`.
2. Configura tu propia URL de base de datos en el archivo `.env`. A continuación se muestra un ejemplo del contenido del archivo `.env.example`:

```bash
PORT=5000
DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/shopping_db


CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
);
```
