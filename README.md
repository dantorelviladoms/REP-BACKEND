# BACK-END de DTL PREMIUM CAR

**Versión:** 0.1 Alpha  
**Estado:** Working 🔧  

## Tecnologías  
- **BackEnd:** Node.js  
- **Base de Datos:** MongoDB  

## Software  
- Node  
- Git  
- Docker  
- Docker Compose  
- Postman  
- Docker Compass / TablePlus  

---

## 📌 Requerimientos Funcionales  
1. Registro y autenticación de usuarios (clientes y administradores).  
2. Gestión de vehículos (alta, edición, eliminación y búsqueda).  
3. Proceso de compra con pasarela de pago segura.  
4. Panel de administración para gestionar ventas y clientes.  

---

## 📌 Requerimientos No Funcionales  
1. Seguridad en autenticación y datos (JWT, SSL/TLS).  
2. Escalabilidad para soportar más usuarios y vehículos.  
3. Disponibilidad alta y backups de la base de datos.  
4. API REST clara y documentada.  

---

## 1ª Fase
## Instalación (Requisitos)
1. MongoDB
2. Docker
## Configuración
1. En Docker, creamos el contenedor para insertar posteriormente la BBDD de MongoDB.
2. En Docker, descargamos la imagen de Mongo, y la insertamos dentro del contenedor.
3. Comprobamos que el container con la imagen insertada, inicie correctamente.
4. Entramos en MongoDB, creamos la conexión con la base de datos, autentificandonos con las credenciales privadas anteriormente declaradas.

## 2ª Fase
## Investigación de entidades y relaciones
1. Identificamos las entidades del e-commerce, con sus campos y atributos, junto a sus relaciones.
2. En Github, creamos el directorio docs/diagrams, donde posteriormente insertaremos el .png del diagrama de entidades.
3. Creamos el diagrama en Draw.io, con sus campos, atributos.
## Creación de los primeros ADR's
1. En Github, creamos el directorio docs/adrs, donde posteriormente insertaremos los archivos de ADR's.
2. Creamos los ADR's, con los apartados obligatorios, contexto, decisión, consecuencias...

## 3º Fase
## Inicialización del proyecto
1. Creamos el directorio /api
2. Inicializamos el proyecto des del Backend
3. Trasladamos los archivos creados anteriormente al directorio /api, siguiendo esta estructura:
  api/
  ├── src/
  │ ├── index.js
  │ ├── config/db.js
  │ └── models/
  ├── .env
  ├── .gitignore
  └── package.json
4. Desarrollamos el contenido básico del index.js, con algun mensaje de prueba aparte de la configuración previa para ver que todo funciona correcto.
5. Añadimos el script en el archivo --> package.json.
## Instalación y Configuracion Mongoose
1. Definimos el fichero src/config/db.js , volviendo a dejar algun mensaje de prueba de la configuración para ver que todo funciona correcto.
2. Añadimos la nueva variable al .env.
3. Creamos el directorio src/models/, donde posteriormente, desarrollaremos los modelos de dos de las clases principales (usuario y vehiculo), con sus validaciones e índices.
