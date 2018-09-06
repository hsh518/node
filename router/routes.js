const appConstructor = require('./app')
const app = new appConstructor()
const user = require('../controller/user')
/** user **/
app.use()
app.get('/user/getUser/', user.getUser)
app.post('/user/postUser/', user.postUser)
app.delete('/user/deleteUser/', user.deleteUser)
app.put('/user/putUser/', user.putUser)

// 返回路由配置
module.exports = app.routes