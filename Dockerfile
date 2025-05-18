# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
