FROM node

WORKDIR /usr/app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
