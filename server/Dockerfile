FROM node:alpine AS build

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080

CMD ["npm", "start"]
