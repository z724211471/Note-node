import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { text } from "body-parser";
@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    title: string;

    @Column({type:"text"})
    text: string;

    @Column()
    add_time: Date;
    @Column()
    updata_time: Date;
}
