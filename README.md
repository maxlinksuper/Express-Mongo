# MongoDB and Express.js REST API application

Implemented by Tanor Abraham Reyuko

## How To Run

1. Set the Atlas URI connection parameter in `server/config.env` to your Connection String:

2. Start the Express server:
```
cd server
npm install
npm install -g nodemon
nodemon server
```

## How to create docker container

1. In the terminal run:
```
docker build -t <username>/node:latest .
docker run -p <port-to-use>:5000 -d <username>/node:latest
```

2. Check if the image is running using
```
docker ps -a
```

3. The container address will be `http://<your_ip_address:<port-to-use>/devs`