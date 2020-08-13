const express = require('express'),
    route = express.Router();

// 引入数据库文件
const sql = require('../sql');
route.get("/articles", async(req, res) => {
    //=>我就是把所有课程中的最后三条数据做为轮播图展示
    let data = await sql.selectAll("user");
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

module.exports = route;