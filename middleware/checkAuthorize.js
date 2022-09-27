require("dotenv").config()
const passport = require('../lib/jwtStategy')
const jwt = require("jsonwebtoken")
module.exports = 
// (req, res, next) =>{
//     let tokenHeader = req.headers['authorization']
//     if(!tokenHeader) return res.send("Not Token on Header")
//     jwt.verify(tokenHeader,process.env.JWT_SECRET, (err, decoded)=>{
//         if(err) return res.send(err)
//         else req.user = decoded
//         next()
//     })
// }
passport.authenticate("jwt", {session: false})