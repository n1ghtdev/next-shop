FROM node:alpine AS build

WORKDIR /usr/client

COPY package*.json yarn.lock ./
RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm","run", "dev"]
