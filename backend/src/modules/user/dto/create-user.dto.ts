import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client'; // Prisma ya genera el enum

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(12, { message: 'Password must be at least 12 characters long' })
    password: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    @IsEnum(Role, { message: 'Role must be either USER or ADMIN (etc.)' })
    role?: Role;
}
