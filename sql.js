const mysql = require('mysql'),
    options = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'my-blog', //连接哪个数据库
        port: '3306' //默认3306,可不设置
    },
    connection = mysql.createConnection(options);

// 连接数据库
connection.connect(err => {
    if (err) {
        console.log(err); //查看是否有连接出错
        return;
    }
    console.log('连接成功');
});

module.exports = (function() {
    // 查询全部表内容
    selectAll = (table) => {
        return new Promise(resolve => {
            connection.query(`select * from ${table}`, async(err, result) => {
                if (err) {
                    throw err;
                }
                resolve(result);
            })
        }).then(res => {
            // connection.end();
            return res;
        }).catch(err => { throw err })
    }

    // 注册登录
    // 检测是否存在用户
    checkDifferent = username => {
        return new Promise(resolve => {
            connection.query(`select * from user where username="${username}"`, (err, result) => {
                if (err) {
                    throw err;
                }
                resolve(result);
            })
        }).then(res => res).catch(err => { throw err })
    }


    // 注册插入数据
    insertData = (obj) => {
        let { username, password, email, roleId, gender = 0, phone } = obj;

        return new Promise(resolve => {
            connection.query(`insert into user (username, password, email, roleId, gender, phone) values (?,?,?,?,?,?)`, [username, password, email, roleId, gender, phone], (err, result) => {
                if (err) {
                    throw err;
                }
                // console.log(result);
                resolve(result)
            })
        }).then(res => {
            return res;
        }).catch(err => { throw err })
    }

    // 登录
    login = (username, password) => {
        return new Promise(resolve => {
            connection.query(`select * from user where username="${ username}" && password="${password}"`, (err, result) => {
                if (err) {
                    throw err;
                }
                // console.log(result);
                resolve(result)
            })
        }).then(res => {
            return res;
        }).catch(err => { throw err })
    }

    // 修改基本资料
    update = (username, password) => {
        return new Promise(resolve => {
            connection.query(`update user set  password="${password}" where username="${ username}" &&`, (err, result) => {
                if (err) {
                    throw err;
                }
                resolve(result)
            })
        }).then(res => {
            return res;
        }).catch(err => { throw err })
    }

    // 文章分类


    // 消息中心

    return {
        selectAll,
        insertData,
        login,
        update,
        checkDifferent
    }
}());
// a.insertData({ username: "bbb", password: 12345678, email: "12345678@163.com", roleId: 132 });
// a.login('bbb', 123456);