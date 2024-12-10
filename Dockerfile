FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

#inspite of having bindmount, copy command is required because it's required in production
COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]