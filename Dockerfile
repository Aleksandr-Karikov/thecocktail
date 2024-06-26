FROM node:20.11.1

WORKDIR /app

ENV VITE_API_URL=https://www.thecocktaildb.com

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]