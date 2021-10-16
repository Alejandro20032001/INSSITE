import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserEnum } from "./enum/user.enum";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    idUser?: string;
    @Column({
        type: 'varchar',
        length: 255
    })
    completeName: string;
    @Column({
        type: 'varchar',
        length: 255
    })
    userName: string;
    @Column({
        type: 'varchar',
        length: 255
    })
    password: string;//auth
    @Column({
        type:'enum',
        enum: UserEnum,
    })
    userRoll: UserEnum;
}
