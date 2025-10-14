import {Body, Controller, Get, Post, Request, Response} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDto} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('sign-up')
    signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    }

    @Post('sign-in')
    async signIn(@Request() req: any, @Response() res: any, @Body() dto: AuthDto) {
        return this.authService.signIn(dto, req, res);
    }

    @Get('sign-out')
    signOut(@Request() req: any, @Response() res: any) {
        return this.authService.signOut(req, res);
    }
}
