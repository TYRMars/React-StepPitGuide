# React 性能优化

## React组件性能优化

* 传递参数要少传，降低React传递数据的负担。尽量不产生新的数据。
* 组件间性能优化，shouldComponentUpdate函数；PureRender；PureComponent 当组件只接受父组件的props，可以使用（React15.4），减少React组件渲染次数。ImmutableJS，通过不可变的数据结构，直接比较其hash值。

## Redux性能优化

* Reselect中间件的使用，纯函数特点：稳定输入稳定输出

## React同构

* 首屏采用服务端渲染
* 
