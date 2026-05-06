# =====================================================
# STAGE 1: Build
# Instal·la TOTES les dependències (incloses les de dev)
# =====================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia els fitxers de dependències primer (millora la caché)
COPY package*.json ./

# npm ci és més ràpid i determinista que npm install (ideal per CI/CD i producció)
RUN npm ci

# Copia la resta del codi font
COPY . .

# =====================================================
# STAGE 2: Production
# Imatge final mínima, sense devDependencies
# =====================================================
FROM node:20-alpine AS production

# Crear un usuari no-root per seguretat
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copia els fitxers de dependències
COPY package*.json ./

# Instal·la NOMÉS dependències de producció
RUN npm ci --only=production

# Copia el codi font des de la stage builder
COPY --from=builder /app/src ./src

# Assigna el directori a l'usuari no-root
RUN chown -R appuser:appgroup /app
USER appuser

# Exposa el port que usa l'API
EXPOSE 5000

# Arrenca el servidor en mode producció
CMD ["node", "src/index.js"]
