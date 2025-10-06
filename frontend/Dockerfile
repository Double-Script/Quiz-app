FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
#installing

EXPOSE 5173

RUN chmod +x node_modules/.bin/vite

CMD ["npx", "vite", "--host", "0.0.0.0"]