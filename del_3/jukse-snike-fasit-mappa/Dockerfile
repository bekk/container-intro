FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
COPY ../server.js .
RUN npm install
CMD npm start
