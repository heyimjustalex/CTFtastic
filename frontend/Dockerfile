FROM node:14
WORKDIR /app
COPY . .
RUN npm install
VOLUME ["/app/node_modules"]

EXPOSE 3000
CMD ["npm","start"]