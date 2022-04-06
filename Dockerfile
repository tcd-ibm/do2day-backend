# Use latest node base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into container
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy current directory into container
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

