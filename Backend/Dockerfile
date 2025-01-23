FROM node:slim

ENV NODE_ENV development

WORKDIR /express-docker

COPY . .

COPY .env .env

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
