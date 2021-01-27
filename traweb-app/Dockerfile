FROM node:14.15.3-alpine3.10 as builder

RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY package.json package-lock.json /app/

# Install app dependencies.
RUN npm install

# Copy app files.
COPY . /app

# Build app
RUN npm run build -- --output-path=./dist/out

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf