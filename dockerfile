FROM node:18-alpine

#WORKING DIRECTORY

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

COPY .env ./

EXPOSE 8080

CMD ["npm","start"]

