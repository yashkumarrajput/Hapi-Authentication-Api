import Boom from 'boom';
import User from '../model/User';
import authenticateUserSchema from '../schemas/authenticateUser';
import {verifyCredentials} from '../util/userFunctions';
import createToken from '../util/token';


module.exports={
    method:'POST',
    path:'/api/users/authenticate',
    config:{
        pre:[{method:verifyCredentials,assign:'user'}],
        handler:(req,res)=>{
            res({id_token:createToken(req.pre.user)}).code(201);
        },
        validate:{
            payload:authenticateUserSchema
        }
    }
}