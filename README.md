多页面注意

```
修改root参数为多页面的根目录：./src/，根据不同目录结构而修改
配置base参数为/，不然打包后js文件的访问路径会出问题
将build.outDir原输入路径dist改为../dist，根据root参数配置层级不同而对应修改
rollupOptions.input中配置多个页面的输入，以下为我使用的配置项

```

mqtt

```
docker run -d --name emqx -p 1883:1883 -p 8081:8081 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:latest

```

## zustand 使用

文件会监听所有 state 的变化, 引发重置渲染(造成页面多次初始化,进而引发的接口重复请求) 不能这样写

```
err
const state = useStore(state=>state)
const {auth} = useStore(state=>state)

good
const auth = useStore(state=>state.auth)
```

同时修改多个值的时候要合并, 避免重复更新.(但没有造成页面多次初始化,进而引发的接口重复请求) 不能这样写

```
err
setIsAuth(true)
setAuth(auth)

good
setKey({
  isAuth: true,
  auth,
})
```

父子组件引用相同依赖时, "应该"是先更新子组件, 然后更新父组件, 再更新子组件
