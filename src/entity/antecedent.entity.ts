import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";

@Entity()
export class Antecedent{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom_antecedent: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column({ type: 'timestamptz', precision: 3 })
    date_ante: Date;
}