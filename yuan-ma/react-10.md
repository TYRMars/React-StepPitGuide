---
description: 简单实现React
---

# SimpleReact

简单实现React

```javascript
/* jsx h */
function h(type,props,...children){
  return(type,props,children)
}

//render 函数
function render(node){
  //如果只是一个字符串
  if(typeof node === 'string'){
    return document.createTextNode(node);
  }
  //如果是HTML节点形成
  const $elem = document.createElement(node.type);
  node.children.map(createElement).forEach($elem.appendChild.bind($elem));
  return $elem;
}

//diff 算法
function changed(node_NEW,node_OLD){
  return typeof node_OLD !== typeof node_NEW ||
         typeof node_OLD === 'string' && node_OLD !== node_NEW ||
         node_OLD.type !== node.type
}

//更新算法
function updateElement($parent,node_NEW,node_OLD,index = 0){

}

/* html */
const list = (
  <ul class="list">
    <li>1</li>
    <li>2</li>
  </ul>
)
/*  */
const $root = document.getElementById('root');
$root.appendChild(createElement(list))
```

