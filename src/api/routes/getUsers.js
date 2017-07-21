import User from '../model/User';
import Boom from 'boom';

module.exports={
    method:'GET',
    path:'/api/users',
    config:{
        handler:(req,res)=>{
            User.find().select('-password -__v').exec((err,users)=>{
                if(err){
                    throw Boom.badRequest(err);
                }
                if(!users.length){
                    throw Boom.notFound('No users found!');
                }
                res(users);
            });
        },
        auth:{
            strategy:'token',
            scope:['admin']
        }
    }
}