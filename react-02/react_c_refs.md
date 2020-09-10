# React 组件DOM操作

\(操作DOM的两种方法\)

* 第一种方式

```javascript
var mySubmitButton = document.getElementById('submitButton');
console.log(mySubmitButton);
ReactDOM.findDOMNode(mySubmitButton).style.color = 'red';
//不推荐此方法，有安全隐患，XSS攻击
```

* 第二种方法

```javascript
console.log(this.refs.submitButton);
this.refs.submitButton.style.color = 'red';
```

## 第二种方法

```javascript
<input ref='myInput' />
this.refs.myInput//通过这种方式对DOM进行操作
```

* Refs是访问到组件内部DOM节点唯一可靠的方法
* Refs会自动销毁对子组件的引用
* 不要在render或render之前对Refs进行调用
* 不要滥用Refs

## 不使用ref

可以利用组件状态来同步记录DOM元素的值，这种方法控制住组建不使用ref

就是通过DOM事件，DOM事件中有个event，当我们使用事件函数传入event就是当前这个DOM对象，通过这种方式操作会好很多

```javascript
render(){
  return (
   <div>
     <form onSubmit={this.onSubmit}>
       <input onChange={this.onInputChange}/>
     </form>
   </div>
  )
}

onInputChange(event) {
  this.setState({
    value: event.target.value
  });
}
```

