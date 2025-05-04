FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN apk add --no-cache docker-cli
COPY . .
EXPOSE 8000
CMD ["node", "index.js"] 