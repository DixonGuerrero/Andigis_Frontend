# Imagen base de Node.js para la construcción
FROM node:20 as build

WORKDIR /home/app-andigis

# Copia los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias, incluyendo Angular CLI globalmente
RUN npm install -g @angular/cli && npm install

# Copia todo el código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build -- --configuration production

# Etapa de producción utilizando NGINX
FROM nginx:alpine as production

# Exponer el puerto 80 para que el contenedor sea accesible
EXPOSE 80

# Copia los archivos construidos desde la etapa de construcción al directorio de NGINX
COPY --from=build /home/app-andigis/dist/andigis-front/browser /usr/share/nginx/html

# Copia el archivo de configuración de NGINX personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Comando para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
