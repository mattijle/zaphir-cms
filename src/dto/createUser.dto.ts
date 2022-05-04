import { IsString, Length, Matches } from "class-validator";
export class CreateUserDto {
    @IsString()
    @Length(4)
    email: string;

    @IsString()
    @Length(4)
    name: string

    @IsString()
    @Length(8)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak.' })
    password: string;
}