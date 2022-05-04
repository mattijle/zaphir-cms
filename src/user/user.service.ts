import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { ROLES } from 'src/constants';


const validatePassword = async (user: UserDocument, password) => {
    return bcrypt.compare(password, user.password);
}

@Injectable()
export class UserService {
    private logger = new Logger('UserService')
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOneByEmail(email): Promise<UserDocument> {
        return await this.userModel.findOne({ email: { $eq: email } })
    }

    async validateUser(authCredentials: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentials;
        const user = await this.userModel.findOne({ email: { $eq: username } });
        if (user && await validatePassword(user, password)) {
            return user.email;
        }
        return null;
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const { email } = createUserDto;
        if (await this.userModel.findOne({ email: { $eq: email } }))
            throw new ConflictException('Email address already registered.')
        const user = new this.userModel(createUserDto);
        user.role = ROLES['EDITOR'];
        return await user.save();
    }
}
