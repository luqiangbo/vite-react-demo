FROM node:14.20.0-alpine as builder


# build:dev  //测试
# build:global  //global
# build:us //us
ARG WEB_ENV

WORKDIR /data/app/eway/

COPY package.json pnpm-lock.yaml /data/app/eway/

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN pnpm install

COPY . /data/app/eway/

RUN pnpm $WEB_ENV 


FROM nginx

COPY --from=builder /data/app/eway/dist/ /usr/share/nginx/html/

COPY --from=builder /data/app/eway/eway.conf /etc/nginx/conf.d/eway.conf
