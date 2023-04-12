import {Router} from "express";
import userModel from "../dao/models/user.model.js";

const authRouter = Router();

authRouter.post("/registro",async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email:email});
        if (!user) {
            const newUser = await userModel.create({email, password});
            req.session.user = newUser.email;
            req.session.rol = "user";
            if (email === "adminCoder@coder.com") {
                req.session.rol = "admin";
                console.log(req.session);
            }
            return res.redirect("/products");
           
        } else {
            res.send(`Usuario ya registrado <a href="/login">Iniciar sesion </a>`)
        }
    } catch (error) {
        console.log(error);
    }
});


authRouter.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const authorized = await userModel.findOne({email:email,password:password});
    if(!authorized){
        res.send("ususario no identificado");
    }else{
        if (email === "adminCoder@coder.com") {
            req.session.user = email;
            req.session.rol = "admin";
            console.log(req.session);
        }else{
            req.session.user = email;
            req.session.rol = "user";
        }
        return res.redirect("/products");
    }  
    
})


authRouter.post("/logout", (req,res) =>{
    req.session.destroy(error => {
        if (error) {
            return res.send (error);
        } else {
            return res.redirect("/login");
        }
    });
});

export default authRouter;