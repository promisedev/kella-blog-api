
const Verify =(req,res,next)=>{
    const {code} = req.body
const otp = req.cookies?.otp
    try {   
    if (otp) {       
   const valid_code = otp?.otp; 

if(code == valid_code){
res.status(200).json({msg:"Email verified successfully"})
next()
}

res.status(403).json({msg:"verification code is incorrect"})
}

res.status(403).json({msg:"your verification code has expired"})

    } catch (error) {
        console.log(error)
    }
}

module.exports =  Verify