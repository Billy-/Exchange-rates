FROM centos:7
MAINTAINER Billy Mathews

# Replace shell with bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install NVM & Node.js
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 6.2.2

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash \
	&& source $NVM_DIR/nvm.sh \
	&& nvm install $NODE_VERSION

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

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