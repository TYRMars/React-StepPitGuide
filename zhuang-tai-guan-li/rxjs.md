# RXJS



### RxJS的核心概念 <a href="#rxjs-de-he-xin-gai-nian" id="rxjs-de-he-xin-gai-nian"></a>

* Observable 可观察的物件
  * 代表一组未来即将产生的事件资料（被观察的物件）
* Observer 观察者物件
  * 代表一个用来接收【观察结果】的物件（收到的就是事件资料）
  * 观察者物件就是一个物件包含3个含有callback函数的属性（next，error，complete）
* Subscription 订阅物件
  * 代表正在执行Observable/Observer的执行个体（可用来来取消订阅）
* Operrators 操作者(运算子)
  * 必须拥有函数编程中所定义的纯函数（pure funtion）特性（没有副作用的函数式）
  * 主要用来处理一系列的事件资料集合
  * 常见的运算子包含 map、filter、concat、flatMap 等
