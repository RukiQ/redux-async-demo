本 demo 在 redux-router-v4-demo 的基础上对模块结构进行了优化，分离了业务组件和纯组件，提高组件复用性，模块结构更加清晰。

具体梳理请参考我的博文：[React技术栈整套工程化流程](https://www.jianshu.com/p/088116f02b26)

### 一、目录结构：

- /asset
	- /css
	- /img
- /src
	- /common --------------- 公用类库
	- /component ------------ Dumb 组件
		- /PostList
		- /Sider
		- /UserList
	- /constant ------------- 公用常量
		- /actionTypes
		- /url
	- /container ------------ Smart 组件
		- index.jsx --------- App 业务组件
		- PostList.jsx ------ 采用 Saga 获取数据
		- UserList.jsx ------ 采用 Thunk 获取数据
	- /redux
		- /reducer
		- /sagas
	- app.jsx ---------------- app入口
- .babelrc
- index.html
- package.json
- README.md
- webpack.config.js

### 二、模块间调用关系

`app.jsx` 为启动入口，配置好 **Thunk/Saga**，将 `store` 传入 `<App />`；

 `<App />` 为 **container** 中的业务组件，专门用来获取异步数据，这样就可以跟 **component** 中的纯组件解耦；

**component** 中的组件不用关心外部的情况，只需要关注传入的 `props` 进行渲染即可。

> 每个 Smart 组件跟 Dumb 组件都通过 `connect` 传递 `props`：通过 `mapStateToProps` 传递 state，通过 `mapDispatchToProps` 传递 dispatch。

#### （1）Thunk 处理流程

**/container/UserList.js**

**Thunk** 直接在业务组件中 `dispatch` 一个函数来异步获取数据。


#### （2）Saga 处理流程

**Saga** 在业务组件中 `dispatch` 一个获取数据的 `action` 命令，然后 `saga` 监听到该 `action` 之后再去获取数据。

---
最后，**Thunk** 和 **Saga** 在异步获取数据之后都会再 `dispatch` 一个 `action`，然后，`reducer` 根据原有的 state 和 该 `action` 返回新的 `state`。
