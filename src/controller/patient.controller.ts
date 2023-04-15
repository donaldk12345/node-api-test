import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Patient } from "../entity/patient.entity";


export const CreatePatient = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Patient);

    const {nom,prenom,sexe,quartier,ville,profession,date_naiss,telephone,numero_cni,antecedents} = req.body;

    const patients = await repository.save({
        nom, prenom, sexe, ville, profession
        , date_naiss, telephone, numero_cni,quartier,
        antecedents: antecedents.map(id => ({id}))

    });

    res.status(200).send(patients);

}

export const getPatients = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Patient);

     res.send( await repository.find());

}

export const getPatient = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Patient);

    res.send( await repository.findOneBy(req.params));

}

export const UpdatePatient = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Patient);
      const {nom,prenom,sexe,quartier,ville,profession,date_naiss,telephone,numero_cni,antecedents} = req.body;

    const patient = await repository.save({
          id: parseInt(req.params.id),
        nom, prenom, sexe, ville, profession
        , date_naiss, telephone, numero_cni,quartier,
        antecedents: antecedents.map(id => ({id}))

    });

    res.send(patient);

}
export const DeletePatient = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Patient);

     await repository.delete(req.params.id);

    res.send(null);

}