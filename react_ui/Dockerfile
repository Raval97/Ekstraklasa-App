FROM node:12.7-alpine
WORKDIR /core
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

