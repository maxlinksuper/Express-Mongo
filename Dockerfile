FROM node:latest

COPY . .
RUN npm install

WORKDIR server
RUN npm install

EXPOSE 5000
ENTRYPOINT ["node", "server.js"]