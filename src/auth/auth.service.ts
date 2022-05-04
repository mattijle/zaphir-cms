import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('Auth');
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userService.validateUser(authCredentialsDto);

        if (!username)
            throw new UnauthorizedException('Invalid Credentials');

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT toke with payload ${JSON.stringify(payload)}, ${accessToken}`);
        return { accessToken };
    }
    async validateUserToken(payload: JwtPayload): Promise<UserDocument> {
        const email = payload.username;
        const user = await this.userService.findOneByEmail(email);
        return user;
    }
}
