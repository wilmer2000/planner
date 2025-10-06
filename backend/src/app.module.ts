import {Module} from '@nestjs/common';
import {UserModule} from './modules/user';
import {PrismaService} from "./core/services/prisma.service";

@Module({
    imports: [UserModule],
    providers: [PrismaService],
})
export class AppModule {
}
