import Boom from 'boom';
import bcrypt from 'bcrypt';
import User from '../model/User';

function verifyUniqueUser(req,res){
    User.findOne({
        $or:[
            {email:req.payload.email},
            {username:req.payload.username}
        ]
    },(err,user)=>{
        if(user){
            if(user.username===req.payload.username){
                res(Boom.badRequest('Username Taken'));
            }
            if(user.email===req.payload.email){
                res(Boom.badRequest('Email Taken'));
            }
        }

        res(req.payload)
    });
}

function verifyCredentials(req,res){
    const password=req.payload.password;
    User.findOne({
        $or:[
            {email:req.payload.email},
            {username:req.payload.username}
        ]
    },(err,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(err,isValid)=>{
                if(isValid){
                    res(user);
                }
                else{
                    res(Boom.badRequest('Incorrect Password!!'));
                }
            });
        } else {
            res(Boom.badRequest('Incorrect username or email!'));
        }
    });
}

module.exports={
    verifyUniqueUser:verifyUniqueUser,
    verifyCredentials:verifyCredentials
}