import { NestMiddleware, Inject, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthMiddleware implements NestMiddleware {
    constructor(@Inject(JwtService) private readonly jwtService: JwtService) {

    }
    use(req: any, res: any, next: (error?: Error | any) => void) {
        try {
            const token = req.headers.authorization;
            console.log(token)
            const tokenWithoutBearer = token.split(' ')[1];
            const decoded = this.jwtService.verify(tokenWithoutBearer, { publicKey: "adkjfbndabsnfknjadhfjvmnöamdhjmngöhkdahjfbmdajhlhön" })
            
            if (decoded) {
                const id = decoded.id;
                //check if user exists in DB
                //
                console.log("TOKEN VALID")
                next()
            }
            else {
                throw new HttpException("Unauthorized", 401)
            }
    
        } catch (error) {
            if(typeof error == typeof HttpException){
                throw error;
            }
            else{
                throw new HttpException("Unauthorized",401)
            }
            
        }
      
    }
}