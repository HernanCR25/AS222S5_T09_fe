# Usar una imagen base de Node.js
FROM node:18

# Crear el directorio de trabajo
RUN mkdir -p /app

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json /app

# Instalar las dependencias
RUN npm install

# Copiar todo el proyecto, incluido el archivo replace-env.sh y los archivos fuente (src/)
COPY . /app

# Asegurarse de que el script replace-env.sh sea ejecutable
RUN chmod +x /app/replace-env.sh

# Ejecutar el script replace-env.sh para reemplazar la variable en environment.ts
RUN bash /app/replace-env.sh

# Construir la aplicación Angular para producción
RUN npm run build --prod

# Exponer el puerto en el que Angular servirá la aplicación
EXPOSE 4200

# Establecer el punto de entrada para ejecutar la aplicación
ENTRYPOINT ["npm", "start"]
