import { Request,Response } from "express"
import { getManager } from "typeorm"
import { Permission } from "../entity/permission"


export const Permissions = async (req: Request, resp: Response) => {

    const repository = getManager().getRepository(Permission);
    resp.send(await repository.find());
}

export const createPermissions = async (req: Request, resp: Response) => {

    const repository = getManager().getRepository(Permission);
    const permission = await repository.save(req.body)
    resp.status(200).send(permission);
}