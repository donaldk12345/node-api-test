import { Request,Response } from "express"
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) =>{
    try{

        let token = req.get('Authorization')
        token = token.split(" ")[1];
        // const jwt= req.header('Authorization')?.split("")[1] || "";
        const payload: any = verify(token, process.env.SECRET_KEY);

    
         if(!payload){
            return res.status(401).send({
                message: "Pas authentifié !"
            })
         }
         const repository = getManager().getRepository(User);
         req["user"] = await repository.findOneBy(payload.id);
         next();

    }catch(e){
        return res.status(401).send({
            message: "Pas authentifié !"
        })

    }

}