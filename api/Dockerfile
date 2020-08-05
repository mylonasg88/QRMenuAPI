FROM node:14

RUN npm install -g nodemon

WORKDIR /usr/src/api
COPY package*.json /usr/src/api/
RUN npm install
COPY . .

CMD nodemon index.js
