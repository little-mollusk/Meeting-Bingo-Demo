# Meeting Bingo MVP - Development Dockerfile
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose the development port
EXPOSE 3000

# Default command for development
CMD ["npm", "run", "dev"]
