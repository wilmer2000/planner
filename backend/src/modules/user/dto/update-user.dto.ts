import {OmitType} from "@nestjs/mapped-types";
import {CreateUserDto} from "./create-user.dto"; // Prisma ya genera el enum

export class UpdateUserDto extends OmitType(CreateUserDto, ['email', 'createdAt', 'password'] as const) {
}
