import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/permission";
import { Role } from "../entity/role.entity";

createConnection().then(async connection => {
    const permissionRepository = getManager().getRepository(Permission);

    const params = ['EDIT_USER', 'VIEW_USER', 'DELETE_USER', 'CREATE_USER', 'CREATE_ROLE', 'VIEW_ROLE',
        'EDIT_ROLE', 'DELETE_ROLE', 'CREATE_ARTICLE', 'EDIT_ARTICLE', 'DELETE_ARTICLE',
        'CREATE_CATEGORY', 'EDIT_CATEGORY', 'DELETE_CATEGORY'];
    
    let permissions = [];
    
    for (let i = 0; i < params.length; i++){
        permissions.push(await permissionRepository.save({
           name: params[i]
      }))
    }

    const roleRepository = getManager().getRepository(Role);
    await roleRepository.save({
        name: 'ADMIN',
        permissions
    })

    process.exit(0);
    
});