FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY . .
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads

ENV NODE_ENV=production
EXPOSE 3001
USER node

CMD ["npm", "start"]
