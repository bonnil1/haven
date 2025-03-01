# 1: Build the app
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite React app (production build)
RUN npm run build

# 2: Serve the app with Nginx
FROM nginx:alpine

# Copy custom Nginx config if needed (optional)
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built app from the first stage to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
