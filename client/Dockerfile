FROM node:alpine AS build

WORKDIR /client

COPY package*.json yarn.lock /client/
RUN npm install

COPY . /client/

EXPOSE 3000

#CMD ["npm","run", "build"]
#CMD ["npm","run", "start"]
CMD ["npm","run", "dev"]
