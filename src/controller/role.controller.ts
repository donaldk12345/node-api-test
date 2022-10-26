import {Request, Response} from 'express'
import { getManager } from 'typeorm';
import { Role } from '../entity/role.entity';

export const Roles = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Role);

    res.send( await repository.find());

}
export const CreateRole = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Role);

    const role = await repository.save(req.body);

    res.send(role);

}
export const UpdateRole = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Role);

     await repository.update(req.params.id, req.body);

    res.send(await repository.findOneBy(req.params));

}
export const DeleteRole = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Role);

     await repository.delete(req.params.id);

    res.send(null);

}