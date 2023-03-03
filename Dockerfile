FROM node:14.20.0-alpine as builder

WORKDIR /data/app/vite-demo/

COPY package*.json /data/app/vite-demo/

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN pnpm install
# RUN umi -v

COPY . /data/app/vite-demo/

RUN pnpm build


# # 二次构建
FROM nginx

COPY --from=builder /data/app/vite-demo/dist/ /usr/share/nginx/html/

COPY --from=builder /data/app/vite-demo/vite-demo.conf /etc/nginx/conf.d/vite-demo.conf
