## React 通用后台模版框架

### 1. React Hook

#### 1.1 特性

1. Hook 是React16.8新增特性
2. Hook 在不用class 组建的情况下使用react特性
3. 解决class组件过于复杂的问题
4. 提供了一系列hook API
   1. useState 定义变量状态
   2. useEffect 生命周期函数
   3. useMemo useCallback
   4. useContext useReducer
   5. useRef

#### 1.2 用法讲解

1. useEffect Hook相当于componentDidMount, componentDidUpdate和componentWillUnMount这三个函数的组合

### 项目亮点

#### 1. callback路径回调

登陆成功，如果你停留在订单页面，再删除token认证之后，重新进行登陆，这个时候就会回到订单页面，而不是欢迎首页。

### 常见问题解答

#### 1. css module的作用

css module是为了解决全局样式重复的问题，比如在某一个组件中的样式只适应于特定组件，但是可能会影响全局样式，这个时候css module就起到作用了

#### 2. watermark水印 给某个区域加上水印，适用于信息防盗

#### 3. 状态管理框架不是用的redux，而是[resso](https://www.npmjs.com/package/resso),它是国产简单的React状态管理器，比较小众但是好用!
