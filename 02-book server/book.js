const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const { json } = require('express')
const app = express()
app.use(cors())
app.listen(3000, () => {
  console.log('启动服务器成功')
})
const filePath = path.join(__dirname, 'data.json')
app.get('/api/getbooks', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return console.log('文件读取失败', err)
    data = JSON.parse(data)
    // console.log(data)
    res.send({
      status: 200,
      msg: '获取图书列表成功',
      data,
    })
  })
})

// 删除功能
app.delete('/api/delbook', (req, res) => {
  const { id } = req.query
  console.log(id)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return console.log('读取文件失败 28行', err)
    data = JSON.parse(data)
    data = data.filter((v) => v.id !== +id)
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) return console.log('文件写入失败 34行', err)
      res.send({
        status: 200,
        msg: '删除图书成功！',
      })
    })
  })
})

// 上面还有问题,应该是数据类型错误

// 添加功能
app.use(express.urlencoded())
app.use(express.json())
app.post('/api/addbook', (req, res) => {
  req.body.id = +new Date() // 时间戳 用来得到一个独一无二的数据
  console.log(req.body)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return console.log('文件读取失败', err)
    data = JSON.parse(data)
    data.push(req.body)
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) return console.log('文件写入失败', err)
      res.send({
        status: 201,
        msg: '添加图书成功',
      })
    })
  })
})
