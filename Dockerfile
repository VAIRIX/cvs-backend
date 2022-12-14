FROM node:18.12.1

WORKDIR /app

COPY ["package.json", "use_npm.js", "/"]
RUN npm install
COPY . .

CMD ["npm", "run", "start:prod"]
