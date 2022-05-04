import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { HashPasswordPipe } from 'src/pipes/hash-password.pipe';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/new')
    async createUser(@Body(ValidationPipe, HashPasswordPipe) createUserDto: CreateUserDto): Promise<UserDocument> {
        let user = await this.userService.createUser(createUserDto);
        user.password = '';
        return user;
    }
}
