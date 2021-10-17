import { hash } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
        length: 255,
        nullable: false,
    })
    userName: string;
    @Column({
        type: 'varchar',
        length: 255,
        select: false,
        nullable: false,
    })
    password: string;//auth
    @Column({
        type:'enum',
        enum: UserEnum,
    })
    userRoll: UserEnum;

    @BeforeInsert()
    @BeforeUpdate()
    async hasPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10)
    }
}
