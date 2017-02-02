FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN mkdir -p static/multipleFiles
RUN mkdir -p static/files

EXPOSE 9090
CMD [ "npm", "start" ]
