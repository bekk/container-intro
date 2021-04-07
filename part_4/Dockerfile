FROM node:15
WORKDIR /usr/src/app
COPY package*.json ./
COPY server.js .
RUN npm install
CMD npm start