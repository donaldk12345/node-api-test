import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Antecedent{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    type: string;
    
    @Column({ type: 'timestamptz', precision: 3 })
    date_antecedant: Date;
}