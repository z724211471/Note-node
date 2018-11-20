import { getRepository,getManager } from 'typeorm';
import { Note } from './text';

export  const operatingNote={
    addNote:async(userdata:object)=>{
        let text = new Note();
        text.userid= userdata['uid'];
        text.title = userdata['title'];
        text.text = userdata['text'];
        text.add_time = new Date();
        text.updata_time = new Date();
        return await getManager().save(Note,text);
    },
    userNote:async(userdata:object)=>{
    return await getRepository(Note).find({where:{userid:userdata['userid']}});
    },
    findNote:async(userdata:object)=>{
        return await getRepository(Note).findOne({where:{id:userdata['noteid']}});
    },
    updataNote:async(userdata:object)=>{
        let text= await getRepository(Note).findOne({where:{id:userdata['noteid']}});
        text.title=userdata['title'];
        text.text=userdata['text'];
        text.updata_time=new Date();
        return  await getRepository(Note).save(text); 
    }
}