import {getManager,getRepository} from "typeorm";
import {User} from "./user"
import {Md5} from 'ts-md5/dist/md5'
export  const operatingUser={
    addUser:async(userdata:object)=>{
        let photo = new User();
        photo.username = userdata['username'];
        photo.password  = Md5.hashStr(userdata['password']).toString(); 
        photo.realname = userdata['realname'];
        photo.login_time = new Date();
        photo.last_login_time = new Date();
       let add  = await getRepository(User).find({where:{username:userdata['username']}});
     if(add.length){
        return {code:0};
     }else{
        return await getManager().save(User,photo);
     }   
    },
    selectUser:async(userdata:object)=>{
     let user=new User();
     user.username=userdata['username'];
     user.password=userdata['password'];
     return await getRepository(User).findOne({where:{username:userdata['username'],password:Md5.hashStr(userdata['password'])}})
    }
}