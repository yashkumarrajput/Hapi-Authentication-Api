import Hapi from 'hapi';
import Boom from 'boom';
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';
import jwt from 'jsonwebtoken';
import secret from './config';

const server=new Hapi.Server();

server.connection({
    port:8080
});

const dbUrl='MONGODB_URI';

server.register(require('hapi-auth-jwt'),(err)=>{
    server.auth.strategy('token','jwt',{
        key:secret,
        verifyOptions:{algorithms:['HS256']}
    });
    server.route(require('./api/routes/userCreate'))
server.route(require('./api/routes/authenticateUser'))
server.route(require('./api/routes/getUsers'))
});

//To check if the Server is working
server.route({
    path:'/',
    method:"GET",
    handler:(req,rep)=>{
        rep('Hello World');
    }
});

server.start(err=>{
    if(err) throw err;
    console.log('Server started at: ',server.info.uri);
});

mongoose.connect(dbUrl,{},(err)=>{
    if(err) throw err;
    console.log('Connected to mongoDB');
});