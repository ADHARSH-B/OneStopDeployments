### Stage 1 -> build the code
FROM node:14.15 AS build
WORKDIR /app
COPY package*.json ./ 
RUN npm install --force
RUN npm install -g @angular/cli  
COPY . ./  
RUN npm run build



## Stage 2 -> Setting up the server
FROM nginx:1.17.1-alpine
COPY  nginx.conf /etc/nginx/nginx.conf
COPY --from=build  /app/dist/avantor-smartshelf-ui/ /usr/share/nginx/html
