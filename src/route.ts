import {Router}  from 'express';
import { Login, Register, AuthenticateUser, Logout, UpdateProfile, UpdatePassword } from './controller/auth.controller';
import { CreateRole, DeleteRole, Roles, UpdateRole, getRoles } from './controller/role.controller';
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from './controller/user.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Permissions, createPermissions } from './controller/permission.controller';
export const routes= (router : Router) =>{

    router.post('/api/register', Register);
    router.post('/api/login',Login);
    router.get('/api/user',AuthMiddleware, AuthenticateUser);
    router.post('/api/logout',AuthMiddleware, Logout);
    router.put('/api/users/info',AuthMiddleware, UpdateProfile);
    router.put('/api/users/password',AuthMiddleware, UpdatePassword);
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

}