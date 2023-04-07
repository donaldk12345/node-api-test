import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import { Permission } from './permission';
import { type } from 'os';

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany( (type) =>Permission, (permissions) => permissions.id,{eager:true})
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
    })
    permissions: Permission[];

}