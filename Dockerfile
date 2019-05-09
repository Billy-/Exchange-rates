FROM node:10

MAINTAINER Billy Mathews

# Copy package.json & install dependencies
COPY ./app/package.json /app/package.json
WORKDIR /app
RUN npm install

# Copy and compile assets
COPY ./app/webpack.config.js ./app/.babelrc ./app/postcss.config.js /app/
COPY ./app/src/. /app/src
RUN npm run webpack

# Copy everything else
COPY ./app/. /app

EXPOSE 8080

CMD npm run start
