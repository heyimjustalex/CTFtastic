FROM nginx

WORKDIR /etc/nginx
COPY ./nginx.conf ./nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]