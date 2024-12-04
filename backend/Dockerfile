# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire backend code to the container
COPY . .

# Expose the port on which the backend will run
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
