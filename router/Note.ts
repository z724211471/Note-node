import * as Rourter from 'koa-router'
import {operatingNote} from '../mysql/addText' 
import { router } from './adminlogin';
const noterouter = new Rourter();
noterouter.post('/addNote',async(ctx,next)=>{
  const data : object = ctx.request.body;
if(!data['title']&&!data['text']&&!data['uid']){
    ctx.body={
        code:401,
        data:'标题或正文不能为空'
    }
}else{
  try {
   let notedata = await operatingNote.addNote(data);
   console.log(notedata);
if(notedata){
    ctx.body={
        code:200,
        data:'添加成功'
    } 
}else{
    ctx.body={
        code:401,
        data:'添加失败'
    } 
}
  } catch (error) {
      console.log(error);
    ctx.body={
        code:401,
        data:'添加失败'
    } 
  }
}
});
router.post('/getUserNote',async(ctx,next)=>{
    const data : object = ctx.request.body;
    if(!data['userid']){
        ctx.body={
            code:401,
            data:'没有登录'
        }
    }else{
        let notelist= await operatingNote.userNote(data);
        console.log(notelist);
        ctx.body={
            code:200,
            data:notelist
        }
    }
})
router.post('/getNote',async(ctx,next)=>{
    const data:object=ctx.request.body;
    if(!data['noteid']){
        ctx.body={
            code:401,
            data:'请传入ID'
        }
    }else{
        let note=await operatingNote.findNote(data);
        if(note===undefined){
            ctx.body={
                code:401,
                data:'ID错误'
            }
        }else{
            ctx.body={
                code:200,
                data:note
            } 
        }
    }
})
router.post('/updataNote',async(ctx,next)=>{
    const data:object=ctx.request.body;
    if(!data['noteid']){
        ctx.body={
            code:401,
            data:'请传入ID'
        }
    }else{
        let note=await operatingNote.updataNote(data);
        console.log(note);
        if(note===undefined){
            ctx.body={
                code:401,
                data:'ID错误'
            }
        }else{
            ctx.body={
                code:200,
                data:note
            } 
        }
    }
})
export {
    noterouter,
  }
