FROM node:18

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

# Ejecutar el script de reemplazo
RUN bash ./replace-env.sh

RUN npm install

COPY . /app

RUN npm run build --prod

EXPOSE 4200

ENTRYPOINT ["npm", "start"]
