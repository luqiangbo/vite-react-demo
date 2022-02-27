多页面注意

```
修改root参数为多页面的根目录：./src/，根据不同目录结构而修改
配置base参数为/，不然打包后js文件的访问路径会出问题
将build.outDir原输入路径dist改为../dist，根据root参数配置层级不同而对应修改
rollupOptions.input中配置多个页面的输入，以下为我使用的配置项

```

```
docker run -d --name emqx -p 1883:1883 -p 8081:8081 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:latest

```
