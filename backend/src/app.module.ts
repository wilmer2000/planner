import {Module} from '@nestjs/common';
import {AuthModule} from "./core/modules/auth/auth.module";
import {PrismaModule} from "../prisma/prisma.module";
import {UsersModule} from "./core/modules/users/users.module";

@Module({
    imports: [AuthModule, PrismaModule, UsersModule],
})
export class AppModule {
}
