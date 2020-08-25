FROM node:14

RUN npm install -g nodemon
RUN npm install -g mocha jest

WORKDIR /usr/src/api
COPY package*.json /usr/src/api/
RUN npm install
COPY . .

CMD nodemon index.js
