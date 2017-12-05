const express = require('express')
const mongoose = require('mongoose')
//链接mongodeb
const DB_URL = 'mongodb://127.0.0.1:27017/test'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function () {
  console.log('mongo connnect success');
})
//类似于mysql的表 mongo里有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
//新增数据
// User.create({
//   user:'zhangjianan',
//   age:21
// },function (err,doc) {
//   if (!err) {
//     console.log(doc);
//   }else{
//     console.log(err);
//   }
// })
//删除数据
// User.remove({'age':21},function (eer,doc) {
//   console.log(doc);
// })
//更新数据
// User.update({'user':xiaoming},{'$set':{age:26}},function(){err.doc}{
//   console.log(doc);
// })
//新建App
const app = express()

app.get('/',function (req,res) {
  res.send('<h1>hello world</h1>');
})

app.get('/data',function (req,res) {
  User.find({},function (err,doc) {
    res.json(doc)
  })
})

app.listen(9093,function functionName() {
  console.log('Node app start at port 9093');
})
