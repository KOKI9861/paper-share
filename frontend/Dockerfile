FROM node:16.11.1
RUN apt update -y

WORKDIR /app
COPY package.json /app/package.json
RUN npm install