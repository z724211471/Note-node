import { getRepository,getManager,createConnection} from 'typeorm';
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
    userNote:async(userdata:string)=>{
    return await getRepository(Note).find({where:{userid:userdata}});
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
    },
    statistics:async(userdata:object)=>{
            return await  getRepository(Note).createQueryBuilder('note')
            .select("Count(*) AS count")
            .addSelect("DATE_FORMAT(note.add_time,'%Y-%m-%d') AS addtime")
            .where("note.userid=:id",{id:userdata['userid']})
            .groupBy("DATE_FORMAT(note.add_time,'%Y-%m-%d')").getRawMany();  
    }
}