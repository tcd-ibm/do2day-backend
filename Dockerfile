# Use most secure node image possible
#FROM node:17.8-bullseye-slim
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

