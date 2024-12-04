# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire frontend code to the container
COPY . .

# Expose the port on which the React app will run
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
