import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Antecedent } from "./antecedent.entity";

@Entity()
export class Patient{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;


    @Column()
    quartier: string;

    @Column({
        nullable:true
    })
    numero_cni: string;
     
    @Column({
        unique: true
    })
    telephone: string;

    @Column()
    profession: string;

    @Column()
    ville: string;

    @ManyToMany(() => Antecedent, (antecedents) => antecedents.id, { eager: true, nullable:true })
    @JoinTable({
        name:'patient_antecedent',
        joinColumn: { name: 'patient_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'antecedent_id', referencedColumnName: 'id' }
         }
    )
    antecedents: Antecedent[];

    @Column()
    sexe:string;

    @Column({ type: 'timestamptz', precision: 3 })
    date_naiss: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_ate: Date;

}