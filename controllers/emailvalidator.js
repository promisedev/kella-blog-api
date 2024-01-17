const jwt = require("jsonwebtoken")
const Nodemailer = require("./nodemailer")
const Nodeoutlook = require("./nodeoutlook")
const Validator = async(req,res, next)=>{
const {email} = req.body;
let randNum = ""

for(let i =0; i<4; i++){
    let num = Math.floor(Math.random(9)*10).toString()
    randNum+=num
}

try {
  let receipients =email
  let subject = "Email verification"
  let message = `<b>your verification code is ${randNum} it expires in 4 mins</b>`
   await  Nodemailer({ receipients, subject, message })

 res
   .cookie(
     "otp",
     { otp: randNum },
     {
       httpOnly: true,
       maxAge: 240000,
     }
   )
   .json({
     msg: `a four digit verification code has been sent to ${email} valid for 4 mins. Enter it in the box below to continue registration`,
     code: randNum,
   });
   
    
} catch (error) {
    console.log(error)
}

}

module.exports = Validator