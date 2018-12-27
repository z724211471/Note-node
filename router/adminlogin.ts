import * as Rourter from 'koa-router'
import {operatingUser} from '../mysql/adduser'
import {set,get} from 'js-cookie'
const router = new Rourter();
interface Userdata {
    username: string;
    realname:string;
    password: string;
}
router.post('/adduser',async(ctx,netx)=>{
  const data : object = ctx.request.body;
if(!data['username']&&!data['password']){
    ctx.body={
        code:401,
        data:'用户名或密码不能为空'
    }
}else if(!data['realname']){
    ctx.body={
        code:401,
        data:'真实姓名不能为空'
    }
}else{
  try {
   let userdata = await operatingUser.addUser(data);
if(userdata['code']===0){
    ctx.body={
        code:401,
        data:'用户已经存在'
    }
}else{
    ctx.body={
        code:200,
        data:'用户添加成功'
    } 
}
  } catch (error) {
    ctx.body={
        code:401,
        data:'用户添加失败'
    } 
  }
}
})
router.post('/openlogin',async(ctx,next)=>{
    console.log(ctx.request.body)
    const data : object = ctx.request.body;
    if(!data['username']&&!data['password']){
        ctx.body={
            code:401,
            data:'用户名或密码不能为空'
        }
    }else{
      let dsx = await operatingUser.selectUser(data);
      console.log(dsx);
      if(!dsx){
        ctx.body={
            code:401,
            data:'用户名或密码错误',
        }
      }else{
        ctx.cookies.set('userid', '1',{
            domain: 'localhost',  // 写cookie所在的域名
            path: '/openlogin',       // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2018-12-27'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
          });
        ctx.cookies.get('userid');
        ctx.body={
            code:200,
            data:dsx,
        }
      }
    }
})


export {
    router,
  }