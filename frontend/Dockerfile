# Build React app
FROM node:23-alpine 
# as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]

# RUN npm run build

# Serve the app with Apache
# FROM httpd:alpine

# Copy the build files from the first stage into Apache's default directory
# COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Copy .htaccess for Apache routing
# COPY .htaccess /usr/local/apache2/htdocs/

# Expose port 80 for Apache
# EXPOSE 80

# The default CMD for httpd (Apache) is already set to run Apache in the foreground
