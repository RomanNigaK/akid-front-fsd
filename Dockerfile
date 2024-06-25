FROM node:lts
# RUN npm install -g yarn

WORKDIR /var/www/html

COPY . /var/www/html/

ENV VITE_API_BASE_URL=
RUN export VITE_API_BASE_URL=""

RUN yarn install
RUN yarn build

