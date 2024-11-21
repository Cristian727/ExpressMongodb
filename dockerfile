# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu app va a correr
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["node", "server.js"]

# Contruye la imagen con: 
# docker build -t my-app .
