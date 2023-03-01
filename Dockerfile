FROM node:14.20.0 as build

WORKDIR /build
# 根据从nodejs网站上抄的代码讲这种操作可以使用缓存
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com \
    && pnpm i
COPY . ./
RUN pnpm build

# 需要打包的内容实际上只是一些静态文件所以在一个空镜像里就可以了
# FROM scratch
# COPY --from=build /build/dist /

# 二次构建
FROM nginx

# 将 dist 文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
# 所以，之前必须执行 npm run build 来打包出 dist 目录，重要！！！
COPY dist/ /usr/share/nginx/html/

# 拷贝 nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# 创建 /admin-fe-access.log ，对应到 nginx.conf
CMD touch /admin-fe-access.log && nginx && tail -f /admin-fe-access.log

