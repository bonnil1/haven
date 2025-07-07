# for development
FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]

# for production
# 1: Build the app
#FROM node:23-alpine AS builder

# Set working directory
#WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json ./

# Install dependencies
#RUN npm install

# Copy the rest of the project files
#COPY . .

# Build the Vite React app
#RUN npm run build

# 2: Serve the application using Apache HTTP server
#FROM httpd:alpine AS production

# Copy the build from the previous stage
#COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Expose the port Apache will run on
#EXPOSE 80

# Below for nginx - USE THIS ONE!!
# 2: Serve the app with Nginx
#FROM nginx:alpine

# Copy Nginx config file
#COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Remove the default nginx index page
#RUN rm -rf /usr/share/nginx/html/*

# Copy the built app from the first stage to Nginx's html directory
#COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port for the server
#EXPOSE 3000

# Start Nginx in the foreground
#CMD ["nginx", "-g", "daemon off;"]
