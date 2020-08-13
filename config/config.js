module.exports = {
    // 端口号
    PORT: 8080,

    //=>CROS跨域相关信息
    CROS: {
        ALLOW_ORIGIN: "*", //=>客户端的WEB地址和端口
        ALLOW_METHODS: 'PUT,POST,GET,DELETE,OPTIONS',
        HEADERS: 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With,AccessToken',
        CREDENTIALS: true
    },

    TOKENSECRET: "myJSONwebtoken151251487412"
}