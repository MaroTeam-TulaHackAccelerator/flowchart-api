import { JwtService } from "@nestjs/jwt"

export class AuthWorker {
  jwtService: JwtService = new JwtService({
    secret: 'V3rySEc9eTP4ssW0RD',
    signOptions: { expiresIn: '24h', },
  });

  generateToken(user: any) {
    const payload = {
      login: user.login,
      userid: user._id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  parseToken(token: string) {
    const user = this.jwtService.verify(token)
    return user
  }
}