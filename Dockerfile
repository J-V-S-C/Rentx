FROM node

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

COPY . . 

EXPOSE 3333

CMD ["sh", "-c", "npm install && npm run dev"]