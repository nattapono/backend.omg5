FROM bitnami/node:14 AS build
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN CYPRESS_INSTALL_BINARY=0 yarn --frozen-lockfile

COPY . .
RUN SILENT=1 yarn run build


FROM bitnami/nginx:1.19 AS prod
WORKDIR /app

COPY --from=build /app/dist .
COPY ./nginx/vuejs.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf


COPY . /app

RUN npm ci

RUN npm start
RUN npm rin build
EXPOSE 3000

CMD ["npx", "server", "dist"]
