import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt, { genSaltSync } from "bcrypt"
import jwt from "jsonwebtoken"

const KEY = "CoderTokenScret"

export const generateToken = (user) => {
    const token = jwt.sign({user}, KEY, {expiresIn: "12h"})
    return token
}


export const authToken=(req,res,next)=>{
    const headerAuth =req.headers['authorization'];
    console.log(headerAuth);
    if(!headerAuth) return res.status(401).send({status:"error",error:"No esta autorizado"})
    const token= headerAuth.split(' ')[1];

    jwt.verify(token,KEY,(error,credentials)=>{
        console.log(error);
        if(error)  return res.status(401).send({status:"error",error:"No esta autorizado"})
        req.user = credentials.user;
        next();

    })
}

export const createHash = password => bcrypt.hashSync(password, genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;