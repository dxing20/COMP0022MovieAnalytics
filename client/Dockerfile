FROM node:16-alpine
RUN apk add git openssh-client
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

WORKDIR /app
COPY package.json .
RUN --mount=type=ssh,id=github npm install 
COPY . .

CMD ["npm", "run", "dev"]