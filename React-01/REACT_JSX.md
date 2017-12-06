# JSX的来历
* 下面是一段官方文档中的引用，它可以解释JSX这种写法诞生的初衷
`We strongly believe that components are the right way to separate concerns rather than "templates" and "display logic" . We think that markup and the code that generate it are intimately tied together . Additionally , display logic is often very complex and using template languages to express it becomes cumbersome`
* 多年以来，在传统的开发中，把模版和功能分离看作是最佳事件的完美例子，翻阅形形色色的框架文档，总有一个模版文件夹里放置了对应的模版文件，然后通过模版引擎处理这些字符，来生成把数据和模版结合起来的字符。而React认为世界是基于组件的，组件自然而然和模版相连，把逻辑和模版分开放置是一种笨重的思路，所以React创造了一种名为JSX的语法格式来架起它们之间的桥梁。

# JSX内置表达式
#### JSX
* 在render方法中有一种直接把HTML嵌套在JS中的写法，它被称为JSX。这种写法类似XML，它可以定义HTML一样简洁的树状结构。这种语法结合了JavaScript和HTML的优点（我理解模版化我们编写的程序，这就是React的初衷）既可以像平常一样使用HTML，也可以在里面嵌套JavaScript语法，这种👬友好的格式，让开发者更易于阅读和开发。而且，对于组件来说，直接使用类似HTML的格式，也是非常合理的。但是，需要注意的是。JSX和HTML完全不是一回事，JSX只是作为编译器，把类似HTML的结构编译成JavaScript。
* JSX的注释是需要特别注意的，采用`{/*注释*/}`
#### JSX不是必须的
* JSX编译器把类似HTML的写法转换成原生的JavaScript方法，并且会将传入的属性转化为对应的对象。它就类似于一种语法糖，把标签类型的写法转换成`React`提供的一个用来创建 ReactElement 的方法
```JavaScript
const MyCompoment;
//input JSX,在JS中直接写成类似HTML的内容，前所未有的感觉，其实它返回的是一个ReactElement
let app = <h1 title="my title"> this is my title </h1>
//JSX转换后的结果
let app = React.createElement('h1',{title: 'my title'},'this is my title');
```
