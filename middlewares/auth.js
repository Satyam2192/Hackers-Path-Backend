// auth, isStudent, is Admin

const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res,next)=>{
    try{
        //extract jwt token
        //PENDING:other ways to fetch token (total 3 ways 1->req.body.token , 2->req.cookie.token, 3->pending)
        // const token = req.body.token;
        console.log(req.cookies.token);
        console.log(req.header("Authorization".replace("Bearer", "")));
        const token = req.cookies.token;
        console.log("token is->",token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing",
            })
        }

        //varify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload
        }catch(error){
            return res.status(500).json({
            success:false,
            message:"token is invalid",
        })
        }

        next();


    }catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"something went wrong",
        })
    }
}

exports.isStudent = (req,res,next) =>{
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"only students have access"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        })
    }
    
}

exports.isAdmin = (req,res,next) =>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"only Admin have access"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        })
    }
    
}