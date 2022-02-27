多页面注意

```
修改root参数为多页面的根目录：./src/，根据不同目录结构而修改
配置base参数为/，不然打包后js文件的访问路径会出问题
将build.outDir原输入路径dist改为../dist，根据root参数配置层级不同而对应修改
rollupOptions.input中配置多个页面的输入，以下为我使用的配置项

```
