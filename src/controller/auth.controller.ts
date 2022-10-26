import {Request, Response} from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { RegisterValidation } from '../validation/register.validation';
import bcryptjs from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export const Register = async (req: Request, res: Response) => {
    const body=  req.body;
    const  {error} = RegisterValidation.validate(body);

    if(error){
        return res.status(400).send(error.details);
    }

    if(body.password !== body.confirm_password){
         return res.status(400).send({
            message: "Le mot de passe ne correspond pas !"
         })
    }

    const repository= getManager().getRepository(User);
    const user = await repository.save({
        username: body.username,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10)
    });

    res.send(user);

}

export const Login = async (req: Request, res: Response) =>{

    const repository= getManager().getRepository(User);
    const user= await repository.findOneBy( { email: req.body.email });

    if(!user){
        return res.status(400).send({
            message: "Désolé l\'utilisateur n\'existe pas !"
        })
    }

    if(!await bcryptjs.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: "Le mot de passe ou l\'email est incorrect !"

        })

    }
    /*const payload ={
        id: user.id
    }*/
   
    const token = sign({ id: user.id }, process.env.SECRET_KEY); 
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    });

    // {password, ...data}= user;
   
    res.send({
        message: "connexion réussie"
    });

}
export const AuthenticateUser = async (req: Request, res: Response) =>{
    const {password, ...user}= req['user'];
    res.send(user);

}
export const Logout = async (req: Request, res: Response) =>{

    res.cookie('jwt', '', {maxAge: 0})
    res.send({
        message: "Deconnexion réussie"
    })
}

export const UpdateProfile = async (req: Request, res: Response) =>{

    const user = req['user'];
    const repository = getManager().getRepository(User);
    await  repository.update(user.id, req.body);
    const {password, ...data} = await repository.findOneBy(user.id);
    res.send(data);
   
}

export const UpdatePassword = async (req: Request, res: Response) =>{

    const user = req['user'];

     if(req.body.password !== req.body.confirm_password){
         return res.status(400).send({
            message: "Le mot de passe ne correspond pas ! veillez réssayer "
         })
     }
    const repository = getManager().getRepository(User);

    await repository.update(user.id, {
          password: await bcryptjs.hash(req.body.password, 10)
    });
    const {password, ...data} = user;
    res.send(data);
    
   
}