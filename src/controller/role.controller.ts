import {Request, Response} from 'express'
import { getManager } from 'typeorm';
import { Role } from '../entity/role.entity';

export const Roles = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Role);

    res.send( await repository.find());

}

export const getRoles = async (req: Request, res: Response) =>{

    const repository = getManager().getRepository(Role);

    res.send( await repository.findOneBy(req.params));

}
export const CreateRole = async (req: Request, res: Response) =>{

    const { name, permissions } = req.body;
    const repository = getManager().getRepository(Role);

    const role = await repository.save({
        name,
        permissions: permissions.map(id => ({id}))
    });

    res.send(role);

}
export const UpdateRole = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Role);
      const { name, permissions } = req.body;

    const role = await repository.save({
        id: parseInt(req.params.id),
        name,
        permissions: permissions.map(id=>({id}))
        
    });

    res.send(role);

}
export const DeleteRole = async (req: Request, res: Response) =>{

   
    const repository = getManager().getRepository(Role);

     await repository.delete(req.params.id);

    res.send(null);

}