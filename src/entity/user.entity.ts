import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne( (type) => Role, (role) => role.id,{ eager:true})
    @JoinColumn({name: 'role_id'})
    role: Role[];

}