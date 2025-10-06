import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common';
import {UserService} from "./user.service";
import {Prisma, User} from "@prisma/client";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        return await this.userService.getById(id);
    }

    @Post('/create')
    async create(@Body() body: CreateUserDto): Promise<User | void> {
        try {
            await this.userService.create(body)
        } catch (e) {
            const errorCode = e.code;
            const isPrismaError = e instanceof Prisma.PrismaClientKnownRequestError;
            const isRegister = errorCode === 'P2002';

            if (isPrismaError && isRegister) {
                throw new ConflictException('Email ya está registrado');
            }

            throw new InternalServerErrorException('Error al crear usuario');
        }
    }

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<User> {
        return await this.userService.update(id, body);
    }

    @Delete('/:id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.userService.delete(id);
    }
}
