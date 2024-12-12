FROM node:22

WORKDIR /app

COPY package.json .

#RUN npm install

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development"]; \
        then npm install; \
        else npm install --only=production; \
        fi

#inspite of having bindmount, copy command is required because it's required in production
COPY . ./

EXPOSE 3000

CMD ["node", "index.js"]