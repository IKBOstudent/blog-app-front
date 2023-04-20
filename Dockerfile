# stage 0 build
FROM node:16-alpine as build

WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json /app/

# RUN npm install
COPY ./build /app/build
COPY ./nginx /app/nginx
# RUN npm run build

# stage 1 nginx server
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]