FROM node:alpine AS build

WORKDIR /server

COPY package*.json /server/
RUN npm install

COPY . /server/

EXPOSE 8080

CMD ["npm", "start"]
