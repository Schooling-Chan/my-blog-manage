// 引入模块
const express = require('express'),
    app = express(),
    path = require("path"),
    CONFIG = require('./config/config'),
    jsonwebtoken = require('jsonwebtoken');

// console.log(CONFIG);
app.listen(CONFIG.PORT, () => {
    console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

//=>实现CROS跨域的中间件
app.use((req, res, next) => {
    const { ALLOW_ORIGIN, CREDENTIALS, HEADERS, ALLOW_METHODS } = CONFIG.CROS;
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Credentials", CREDENTIALS);
    res.header("Access-Control-Allow-Headers", HEADERS);
    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

//=>把所有POST请求，请求主体传递的内容进行解析，把URL-ENCODED格式转换为对象，存放到REQ.BODY属性上的
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static/build')));

app.use('/blog', require("./router/blog"));
app.use('/login', require("./router/login"));

app.use((req, res, next) => {
    res.status(404);
    res.send('NOT FOUND!');
});