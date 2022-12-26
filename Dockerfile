FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm cache clean --force
COPY . .
RUN npm run build
RUN npm prune --production

COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html
