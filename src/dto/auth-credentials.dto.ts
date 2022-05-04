import { IsString, Length, Matches } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    username: string;

    @IsString()
    @Length(8)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak.' })
    password: string;
}