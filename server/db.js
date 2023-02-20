const Sequelize = require('sequelize')

const sequelize = new Sequelize('robots', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    },

})
 
// 定义用户模型
const User = sequelize.define('user', {
    username: Sequelize.STRING,
    pwd: Sequelize.STRING,
    role: Sequelize.STRING
})
// 定义消息模型
const Msg = sequelize.define('msg', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    content: Sequelize.STRING,
})

User.sync()
Msg.sync();
// 注册
exports.register = async (params, callback) => {
    let res = await User.findOne({
        where: {
            username: params.username
        }
    })
    if(res){
        callback('已存在的用户！')
        return;
    }
    User.create({
        ...params
    }).then(res => {
        callback(null, res)
    }).catch(err => {
        callback('注册失败！')
    })
}

// 登录 
exports.login = (params, callback) => {
    User.findOne({
        where: {
            ...params
        }
    }).then(res => {
        if (!res) {
            callback('账号或密码错误！')
            return;
        }
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 查询所有用户
exports.findAllUsers = (params, callback) => {
    User.findAll().then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 编辑用户
exports.updateUser = (params, body ,callback) => {
    User.update({
        ...body
    }, {
        where: {
            id: params.id
        }
    }).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 删除用户
exports.deleteUser = (params, callback) => {
    // console.log("params = ", params)
    User.destroy({
        where: {
            id: params.id
        }
    }).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 发布消息
exports.public = (params, callback) => {
    Msg.create({
        ...params
    }).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 查询所有消息
exports.findAll = (params, callback) => {
    Msg.findAll().then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 详情
exports.findOne = (params, callback) => {
    const {
        id
    } = params;
    Msg.findOne({
        where: {
            id
        }
    }).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}

// 删除消息
exports.deleteMsg = (params, callback) => {
    Msg.destroy({
     where: {
        id: params.id
     }
    }).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err)
    })
}