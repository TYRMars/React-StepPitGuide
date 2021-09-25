# 受控与非受控组件

* 受控组件：组件的state由我们来管理
* 非受控组件：组建的state由组件本身管理

## 受控组件

表单元素&lt;input&gt;、&lt;textarea&gt;和&lt;select&gt; 要自己维护state，并根据用户输入进行更新。而在React中，可变状态（mutable state）通常保存在组件的state属性中，并且只能通过使用setState\(\)来更新。

