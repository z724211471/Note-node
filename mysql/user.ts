import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    username: string;

    @Column()
    password: string;

    @Column()
    realname: string;

    @Column()
    login_time: Date;

    @Column()
    last_login_time: Date;
}
