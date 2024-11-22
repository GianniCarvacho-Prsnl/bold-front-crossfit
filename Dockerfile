# Usa una imagen base ligera de Nginx
FROM nginx:stable-alpine

# Copia los archivos generados por el build a la carpeta que Nginx usa para servir contenido estático
COPY dist /usr/share/nginx/html

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]