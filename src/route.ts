import {Router}  from 'express';
import { Login, Register, AuthenticateUser, Logout, UpdateProfile, UpdatePassword } from './controller/auth.controller';
import { CreateRole, DeleteRole, Roles, UpdateRole, getRoles } from './controller/role.controller';
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from './controller/user.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Permissions, createPermissions } from './controller/permission.controller';
import { upload } from './controller/upload.file';
import multer from 'multer';
import { extname } from 'path';
import { CreatePatient, DeletePatient, UpdatePatient, getPatient, getPatients } from './controller/patient.controller';
import { CreateAntecedent, DeleteAntecedent, UpdateAntecedent, getAntecedent } from './controller/antecedent.controller';
import { countItems } from './controller/dashboard.controller';
export const routes= (router : Router) =>{

    router.post('/api/register', Register);
    router.post('/api/login',Login);
    router.get('/api/user',AuthMiddleware, AuthenticateUser);
    router.post('/api/logout',AuthMiddleware, Logout);
    router.put('/api/user/info',AuthMiddleware, UpdateProfile);
    router.put('/api/user/password/:id',AuthMiddleware, UpdatePassword);
    router.get('/api/users',AuthMiddleware, Users);
    router.post('/api/users', AuthMiddleware, CreateUser);
    router.get('/api/users/:id', AuthMiddleware, GetUser);
    router.put('/api/users/:id', AuthMiddleware, UpdateUser);
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser);

    router.get('/api/roles',AuthMiddleware, Roles);
    router.post('/api/roles',AuthMiddleware, CreateRole);
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole);
    router.get('/api/roles/:id', AuthMiddleware, getRoles);
    router.delete('/api/roles/:id', AuthMiddleware, DeleteRole);

    router.get('/api/permissions', AuthMiddleware, Permissions);
    router.post('/api/permissions', AuthMiddleware, createPermissions);

    router.post('/api/patients', AuthMiddleware, CreatePatient);
    router.get('/api/patients', AuthMiddleware, getPatients);
    router.get('/api/patient/:id', AuthMiddleware, getPatient);
    router.put('/api/patient/:id', AuthMiddleware, UpdatePatient);
    router.delete('/api/patient/:id', AuthMiddleware, DeletePatient);

    router.post('/api/antecedents', AuthMiddleware, CreateAntecedent);
    router.get('/api/antecedents', AuthMiddleware, getAntecedent);
    router.put('/api/antecedant/:id', AuthMiddleware, UpdateAntecedent);
    router.delete('/api/antecedent/:id', AuthMiddleware, DeleteAntecedent);


    router.get('/api/items', AuthMiddleware, countItems);

    const storage = multer.diskStorage({
        destination: './upload',
        filename(_, file, callback) {
            const randomName = Math.random().toString(28).substr(2, 12);
            return callback(null,`${randomName}${extname(file.originalname)}`)
        }
    })

    router.post('/api/file',multer({storage}).single('file') ,AuthMiddleware, upload);

}