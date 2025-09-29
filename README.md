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
