const appConstructor = require('./app')
const app = new appConstructor()
const params = require('../middleware/params')
const user = require('../controller/user')

/** user **/
app.use(params)
app.get('/user/getUser/', user.getUser)
app.post('/user/addUser/', user.addUser)
app.delete('/user/deleteUser/', user.deleteUser)
app.put('/user/putUser/', user.putUser)

// 返回路由配置
module.exports = app.routes