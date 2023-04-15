import { getManager } from "typeorm";
import { Antecedent } from "../entity/antecedent.entity";
import { Request, Response } from "express";



export const CreateAntecedent = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Antecedent);
    
    const { nom, type,date_antecedant} = req.body;

    const antecedents = await repository.save({
        nom,
        type,
        date_antecedant
    });

    res.status(200).send(antecedents);

}

export const getAntecedent = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Antecedent);

     res.send( await repository.find());

}
export const UpdateAntecedent = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Antecedent);
    
    const { nom, type,date_antecedant} = req.body;

    const antecedents = await repository.save({
        id: parseInt(req.params.id),
        nom,
        type,
        date_antecedant
    });

    res.status(200).send(antecedents);

}

export const DeleteAntecedent = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Antecedent);

     await repository.delete(req.params.id);

    res.send(null);

}