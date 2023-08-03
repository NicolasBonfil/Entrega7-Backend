// import passport from "passport"
// import local from "passport-local"
// import userModel from "../dao/models/Users.model.js"
// import {createHash, isValidPassword} from "../utils.js"
// import GitHubStrategy from "passport-github2"

// export const initPassport = () => {
//     passport.use("github", new GitHubStrategy(
//         {
//             clientID: "Iv1.47d06ec4d1158dbe",
//             clientSecret: "736197931b21dd71e41b5c03a233e0849cd1c676",
//             callbackURL: "http://localhost:8080/api/session/githubcallback"
//         },
        
//         async(accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await userModel.findOne({email: profile._json.email})

//                 if(!user){
//                     let newUser = {
//                         first_name: profile._json.name,
//                         last_name: "",
//                         email: profile._json.email,
//                         password: ""
//                     }
//                     let result = await userModel.create(newUser)
//                     done(null, result)
//                 }else{
//                     done(null, user)
//                 }

//             } catch (error) {
//                 return done(error)
//             }
//         }
//     ))
// }

// passport.serializeUser((user, done) => {
//     done(null, user._id)
// })

// passport.deserializeUser(async(id, done) => {
//     let user = await userModel.findById(id)
// })


// const LocalStrategy = local.Strategy

// export const initializedPassport = () => {
//     passport.use("register", new LocalStrategy(
//         {passReqToCallback: true, usernameField: "email"}, async (req, username, password, done) => {
//             const {first_name, last_name, email, age} = req.body
//             try{
//                 let user = await userModel.findOne({email: username})
//                 if(user){
//                     console.log("User already exists")
//                     return done(null, false)
//                 }
//                 const newUser = {
//                     first_name,
//                     last_name,
//                     email,
//                     password: createHash(password)
//                 }
//                 let result = await userModel.create(newUser)
//                 return done(null, result)
//             }catch(error){
//                 return done("Error de usuario" + error)
//             }
//         }
//     ))

//     passport.use("login", new LocalStrategy(
//         {passReqToCallback: true, usernameField: "email"}, async (req, email, password, done) => {
//             try{
//                 const user = await userModel.findOne({email: email})
//                 if(!user){
//                     console.log("User no exists");
//                     return done(null, false)
//                 }
//                 if(!isValidPassword(user, password)) return done(null, false)
//                 return done(null, user)
//             } catch (error) {
//                 return done(null, false)
//             }
//         }
//     ))

//     passport.serializeUser((user, done) => {
//         done(null, user.id)
//     })

//     passport.deserializeUser(async(id, done) => {
//         let user = await userModel.findById(id)
//         done(null, user)
//     })
// }

import passport from "passport"
import local from "passport-local"
import userModel from "../dao/models/Users.model.js"
import {createHash, isValidPassword} from "../utils.js"
import GitHubStrategy from "passport-github2"

const initPassport = () => {
    passport.use("github", new GitHubStrategy(
        {
            clientID: "Iv1.47d06ec4d1158dbe",
            clientSecret: "736197931b21dd71e41b5c03a233e0849cd1c676",
            callbackURL: "http://localhost:8080/api/session/githubcallback"
        },
        
        async(accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({email: profile._json.email})

                if(!user){
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile._json.email,
                        age: "",
                        password: ""
                    }
                    let result = await userModel.create(newUser)
                    done(null, result)
                }else{
                    done(null, user)
                }

            } catch (error) {
                return done(error)
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async(id, done) => {
    let user = await userModel.findById(id)
})

export default initPassport