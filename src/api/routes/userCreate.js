import bcrypt from 'bcrypt';
import Boom from 'boom';
import User from '../model/User';
import createUserSchema from '../schemas/createUser';
import {verifyUniqueUser} from '../util/userFunctions';
import createToken from '../util/token';

function hashPassword(password,cb){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            return cb(err,hash);
        });
    });
}

module.exports={
    method:'POST',
    path:'/api/users',
    config:{
        pre:[{method:verifyUniqueUser}],
        handler:(req,res)=>{
            let user=new User();
            user.email=req.payload.email;
            user.username=req.payload.username;
            user.admin=false;
            hashPassword(req.payload.password,(err,hash)=>{
                if(err){
                    throw Boom.badRequest(err);
                }
                user.password=hash;
                user.save((err,user)=>{
                    if(err){
                        throw Boom.badRequest(err);
                    }
                    res({id_token:createToken(user)}).code(201);
                });
            });
        },
        validate:{
            payload:createUserSchema
        }
    }
}