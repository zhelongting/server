const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db')
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
// 注册
app.post('/register', (req, res) => {
    console.log("req.body = ", req.body)
    db.register(req.body, (err, val) => {
        if (err) return res.json({
            code: -1,
            msg: err
        })
        res.json({
            code: 200,
            msg: '注册成功',
            data: val
        })
    })
})

// 登录
app.post('/login', (req, res) => {
    db.login(req.body, (err, val) => {
        if (err) return res.json({
            code: -1,
            msg: err
        })
        res.json({
            code: 200,
            msg: '登录成功',
            data: val
        })
    })
})

// 查询所有用户
app.get('/findAllUsers', (req, res) => {
    db.findAllUsers(req.query, (err, val) => {
        if (err) return res.send('查询失败')
        res.json({
            code: 200,
            msg: '查询成功',
            data: val
        })
    })
})

// 更新用户
app.put('/updateUser/:id', (req, res) => {
    db.updateUser(req.params, req.body, (err, val) => {
        if (err) return res.send('更新失败')
        res.json({
            code: 200,
            msg: '更新成功',
            data: val
        })
    })
})

// 删除用户
app.delete('/deleteUser/:id', (req, res) => {
    db.deleteUser(req.params, (err, val) => {
        if (err) return res.send('删除失败');
        res.json({
            code: 200,
            msg: '删除成功',

        })
    })
})

// 发布消息
app.post('/public', (req, res) => {
    db.public(req.body, (err, val) => {
        if (err) return res.send('发布失败')
        res.json({
            code: 200,
            msg: '发布成功'
        })
    })
})

// 所有消息
app.get('/findAll', (req, res) => {
    db.findAll(req.query, (err, val) => {
        if (err) return res.send('查询失败')
        res.json({
            code: 200,
            msg: '查询成功',
            data: val
        })
    })
})

// 查询消息详情
app.get('/findOne', (req, res) => {
    db.findOne(req.query, (err, val) => {
        if (err) return res.send('查询失败')
     
    })
})

// 删除消息
app.delete('/deleteMsg/:id', (req, res) => {
    db.deleteMsg(req.params, (err, val) => {
        if (err) return res.send('查询失败')
        res.json({
            code: 200,
            msg: '删除成功',
  
        })
    })
})


app.listen(5000)