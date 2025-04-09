import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JWTStratagy extends PassportStrategy(Strategy) {
  constructor(

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || ""  // Use the secret from environment variables
    })
  }

  async validate(payload: any) {
    console.log(payload)
    return {
      id: payload.sub,
      email: payload.email
    }
  }
}