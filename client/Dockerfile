#picking up node with its version
FROM node:16

# Create container working directory 
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]