import { getPermissions } from '../models/contentEngine.model';

const checkPermission = (permissionArray, check_all = true) => {
   return async (req, res, next) => {
      const userId = req.roles[0] == 'USER' ? req.customerId : req.userId;

      if (!userId) {
         return res.status(400).send({ message: 'User ID is required' });
      }

      try {
         let permissions = await getPermissions(userId);

         if (!Array.isArray(permissions) || permissions.length === 0) {
            return res
               .status(403)
               .send({ message: 'Forbidden: No Permissions' });
         }

         permissions = permissions[0] || [];
         if (permissions.length === 0) {
            return res
               .status(403)
               .send({ message: 'Forbidden: No Permissions' });
         }

         // console.log("All Permissions:", permissions);
         let denialPermissions = permissions.filter(
            item => item.denialFlag === 1,
         );
         // console.log(' denialPermissions:', denialPermissions);
         // console.log('Check All:', check_all);
         if (denialPermissions.length > 0) {
            permissions = permissions.filter(item => item.denialFlag !== 1);
            let denialPermissionNames = denialPermissions.map(
               item => item.name,
            );
            permissions = permissions.filter(
               item => !denialPermissionNames.includes(item.name),
            );
         }
         //  console.log('Filtered Permissions:', permissions);
         let hasPermission;
         if (check_all) {
            // AND
            hasPermission = permissionArray.every(permission =>
               permissions.some(item => item.name === permission),
            );
         } else {
            // OR
            hasPermission = permissionArray.some(permission =>
               permissions.some(item => item.name === permission),
            );
         }

         if (!hasPermission) {
            console.error(
               'Forbidden: ----- Missing Permissions: ',
               permissionArray.filter(
                  permission =>
                     !permissions.some(item => item.name === permission),
               ),
            );
            return res
               .status(403)
               .send({ message: 'Forbidden: Insufficient Permissions' });
         } else {
            req.permissions = permissions.map(item => item.name);
            //   console.log('Formatted Req Permissions:', req.permissions);
            next();
         }
      } catch (error) {
         console.error(
            'Error occurred while checking permissions:',
            error.message,
         );
         return res.status(500).send({ message: 'Internal Server Error' });
      }
   };
};

export default checkPermission;
