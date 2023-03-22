FROM node:alpine

RUN apk add git openssh-client
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts



WORKDIR /app
COPY package.json .
RUN echo "Installing dependencies.. ..  .."
RUN --mount=type=ssh,id=github npm i 
COPY . . 

CMD ["npm", "start"]