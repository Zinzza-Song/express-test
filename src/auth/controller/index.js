import {Router} from "express";
import { AuthService } from "../service";
import { RegisterDTO } from "../dto";

class AuthController{
    authService;
    router;
    path="/auth";

    constructor(){
        this.router=Router();
        this.initial();
        this.authService=new AuthService();
    }

    initial(){
        this.router.post("/register",this.register.bind(this));
    }

    async register(req,res,next){
        try{
            const body=req.body;
            const{accessToken,refreshToken}=await this.authService.register(
                new RegisterDTO(body)
            );

            res.status(200).json({
                accessToken,
                refreshToken,
            });
        }catch(err){
            next(err);
        }
    }
}
const authCon=new AuthController();
export default authCon;