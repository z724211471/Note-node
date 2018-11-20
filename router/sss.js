// const router = require('koa-router')();
// const mysql= require('../mysql/mysql.js')
// router.post('/admin', async (ctx, netx) => {
//     console.log(1111)
//     console.log( ctx.response.status)
//     console.log( ctx.request.body)
//     let data=ctx.request.body;
//     if(!data.username){
//     ctx.body={
//         msg:'用户名不能为空!',
//         code:0,
//     }
//     }else{
//         try{
//             mysql.addUser(data.username,data.password)
//             ctx.body={
//                 msg:'创建成功',
//                 code:1,
//             }
//         }catch(err){
//             ctx.body={
//                 msg:'创建失败',
//                 code:0,
//             }
//         }
//     }
   
  
// })

// module.exports = router