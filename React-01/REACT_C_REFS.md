# 组件Refs

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



