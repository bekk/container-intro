FROM nginx:latest
COPY index.html /data/www/
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]