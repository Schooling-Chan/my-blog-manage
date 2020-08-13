const express = require('express'),
    route = express.Router(),
    crypto = require("crypto"),
    jsonwebtoken = require('jsonwebtoken');

// 引入数据库文件
const sql = require('../sql'),
    { TOKENSECRET: secret } = require("../config/config");

// 注册模块
route.post("/register", async(req, res) => {
    const hash = crypto.createHash("md5"),
        username = req.body.username,
        password = req.body.password.split().reverse().join();
    hash.update(password);
    let data = await sql.insertData({ username, password: hash.digest('hex').slice(2) })
    res.send({
        code: 0,
        msg: 'OK!'
    });
});

// 检测模块
route.get("/checkUser", async(req, res) => {
    const username = req.query.username;
    // console.log(username);
    let data = await sql.checkDifferent(username);
    if (data.length === 0) {
        res.send({
            code: 1,
            msg: '用户不存在'
        });
        return;
    }
    res.send({
        code: 0,
        msg: '该用户已注册'
    });
})

// 登录模块
route.post("/", async(req, res) => {
    const hash = crypto.createHash("md5"),
        username = req.body.username,
        password = req.body.password.split().reverse().join();
    hash.update(password);
    let data = await sql.login(username, hash.digest('hex').slice(2)),
        token = jsonwebtoken.sign({
            account: username,
            id: data[0].id
        }, secret, {
            expiresIn: "64h"
        });

    if (data.length === 0) {
        res.send({
            code: 1,
            msg: 'No!'
        });
    }
    res.send({
        code: 0,
        msg: 'OK!',
        token
    });
});


// 判断是否登录过期，获取用户名
route.get("/", async(req, res) => {
    let token = req.get("accessToken");


    jsonwebtoken.verify(token, secret, (err, decoded) => {
        if (err) { //如果err存在代表过期
            res.send({
                message: "身份过期，请重新登录",
                code: 1
            })
            return;
        }
        res.send({
            code: 0,
            username: decoded.account
        })
    })
});

// 修改密码
route.post("/password", async(req, res) => {
    let token = req.get("accessToken");

    jsonwebtoken.verify(token, secret, async(err, decoded) => {
        if (err) { //如果err存在代表过期
            res.send({
                message: "身份过期，请重新登录",
                code: 1
            })
            return;
        }

        const hash = crypto.createHash("md5"),
            username = req.body.username,
            password = req.body.password.split().reverse().join();
        hash.update(password);
        let data = await sql.update(username, hash.digest('hex').slice(2));

        if (data.length === 0) {
            res.send({
                code: 1,
                msg: '修改失败'
            });
        }
        res.send({
            code: 0,
            message: "修改成功"
        })
    })
});

module.exports = route;