# Use a base image with Node.js
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild native modules
RUN npm rebuild

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3321

# Command to run the app
CMD ["npm", "start"]
