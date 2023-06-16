import { createQueryBuilder, getManager } from "typeorm";
import { Patient } from "../entity/patient.entity";
import { Request, Response } from "express";


export const countItems = async (req: Request, res: Response) =>{

    const patient = await createQueryBuilder('Patient').select("COUNT(Patient.id)", "patients").getRawOne();
    const users = await createQueryBuilder('User').select("COUNT(User.id)", "users").getRawOne();
     const roles = await createQueryBuilder('Role').select("COUNT(Role.id)","roles").getRawOne();

    return res.send([patient,users,roles]);

}