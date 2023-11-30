# use node.js lts alpine as base image
FROM node:lts-alpine as build

# config npm especially set registry
RUN npm config set registry https://registry.npmmirror.com
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-maxtimeout 80000
RUN npm config set fetch-retry-mintimeout 20000

# optimize docker cache for install
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install

# copy project files and run build
COPY . .
RUN npm run lint
RUN npm run test
RUN npm run build

# use nginx stable alpine as base image
FROM nginx:stable-alpine as dist

# remove default nginx page if exists
RUN rm -rf /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html

# copy build results and nginx configs
COPY --from=build /app/dist /usr/share/nginx/html
COPY gzip.conf /etc/nginx/conf.d/gzip.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# start nginx with http port exposed
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
