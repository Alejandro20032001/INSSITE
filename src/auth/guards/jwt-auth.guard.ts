import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuards extends AuthGuard ('jwt') {
    
    handleRequest(err, user, info){
        if(err|| !user) {
            throw err || new UnauthorizedException('YOU ARE NOT AUTHORIZED')
        }
        return user;
    }
}